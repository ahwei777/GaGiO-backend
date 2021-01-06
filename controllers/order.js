const { Op } = require('sequelize');
const db = require('../models');
const { sequelize } = require('../models');
const { Order, Order_item, Cart_item } = db;

const orderController = {
  getOrderList: (req, res) => {
    const { _page, _limit, _sort, _order } = req.query;
    let CoursesPerPage = Number(_limit) || 5;
    let sort = _sort || 'id';
    let order = _order || 'ASC';
    let where = req.query.UserId ? { UserId } : '';
    Order.findAll({
      offset: _page ? (_page - 1) * CoursesPerPage : 0,
      limit: _page ? CoursesPerPage : null,
      order: [[sort, order]],
      where,
    })
      .then((orderList) => {
        if (orderList.length === 0)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'No available orders',
          });
        return res.status(200).json({
          ok: 1,
          data: {
            orderList,
          },
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  getMyOrderList: (req, res) => {
    const { _page, _limit, _sort, _order } = req.query;
    let CoursesPerPage = Number(_limit) || 5;
    let sort = _sort || 'id';
    let order = _order || 'ASC';
    Order.findAll({
      offset: _page ? (_page - 1) * CoursesPerPage : 0,
      limit: _page ? CoursesPerPage : null,
      order: [[sort, order]],
      where: {
        UserId: req.userId,
      },
    })
      .then((orderList) => {
        if (orderList.length === 0)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'No available orders',
          });
        return res.status(200).json({
          ok: 1,
          data: {
            orderList,
          },
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  getOrder: (req, res) => {
    // 管理員才可查看非自己的訂單
    let where =
      req.authTypeId === 3
        ? {
            id: req.params.id,
          }
        : { id: req.params.id, userId: req.userId };
    Order.findOne({
      where,
      include: [Order_item],
    })
      .then((order) => {
        if (!order)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'No available order',
          });
        return res.status(200).json({
          ok: 1,
          data: {
            order,
          },
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  receiveOrder: async (req, res) => {
    const { name, orderCourses, paymentType, sumPrice } = req.body;
    console.log(req.body);
    if (!name || !orderCourses || !paymentType || !sumPrice) {
      return res.status(400).json({
        ok: 0,
        errorMessage: '資料不齊全',
      });
    }
    // 檢查有無重複購買或非公開課程
    console.log('orderCourses', orderCourses);
    let newOrderId;
    try {
      // 開始 transaction 全部成功或全部失敗
      // 依照付款資料授權課程給 user
      await sequelize.transaction(async (t) => {
        const newOrder = await Order.create({
          // 身分驗證
          UserId: req.userId,
          name,
          paymentType,
          sumPrice,
          orderCourses: JSON.stringify(orderCourses),
          // 付款驗證
          isPaid: true,
        });
        if (!newOrder) {
          return res.status(400).json({
            ok: 0,
            errorMessage: 'send order failed',
          });
        }
        newOrderId = newOrder.id;
        await Order_item.bulkCreate(
          orderCourses.map((el, i) => {
            return {
              // 身分驗證
              OrderId: newOrder.id,
              CourseId: el.CourseId,
              amountPaid: el.amountPaid,
            };
          }),
          { transaction: t }
        );

        // 刪除購物車內已有商品
        await Cart_item.update(
          // 設為已結帳
          { checkedOutAt: new Date() },
          {
            where: {
              deletedAt: null,
              UserId: req.userId,
              CourseId: {
                [Op.in]: orderCourses.map((el) => {
                  return el.CourseId;
                }),
              },
            },
          },
          { transaction: t }
        );
      });

      // 所有作業完成
      console.log('收到訂單，orderId: ', newOrderId);
      return res.status(200).json({
        ok: 1,
        orderNumber: newOrderId,
      });

      /*
      // promise 方式
      const promises = orderCourses.map( async(el, i) => {
        console.log(i)
        await Paid_course.create({
          // 身分驗證
          UserId: req.userId,
          CourseId: el.CourseId,
          amountPaid: el.amountPaid,
        })
      })
      Promise.all(promises).then((results) => {
        console.log('all success', results)
        return res.status(200).json({
          ok: 1,
          orderNumber: setOrder.id,
        });
      })
      */
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      return res.status(400).json({
        ok: 0,
        errorMessage: error.toString(),
      });
    }
  },
};

module.exports = orderController;
