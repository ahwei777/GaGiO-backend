const { Op } = require('sequelize');
const db = require('../models');
const { sequelize } = require('../models');
const { Order, Order_item, Course, Cart_item } = db;

const orderController = {
  getMyOrders: (req, res) => {
    /* 
    #swagger.tags = ['Orders']
    #swagger.summary = '取得自己的訂單列表'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.parameters['_page'] = {
      in: 'query',
      description: '分頁(預設每頁五筆)',
      type: 'number',
    }
    #swagger.parameters['_limit'] = {
      in: 'query',
      description: '搭配分頁參數可調整每頁資料數目',
      type: 'number',
    }
    #swagger.parameters['_sort'] = {
      in: 'query',
      description: '排序依據(預設 id)',
      type: 'array',
      items: {
        type: 'string',
        enum: [
          'id',
          'sumPrice',
          'createdAt'
        ],
        default: 'id'
      }
    }
    #swagger.parameters['_order'] = {
      in: 'query',
      description: '排序方式(預設遞增)',
      type: 'array',
      items: {
        type: 'string',
        enum: [
          'ASC',
          'DESC'
        ],
        default: 'ASC'
      }
    }
    */
    const { _page, _limit, _sort, _order } = req.query;
    let CoursesPerPage = Number(_limit) || 5;
    let sort = _sort || 'id';
    let order = _order || 'ASC';
    Order.findAll({
      offset: _page ? (_page - 1) * CoursesPerPage : 0,
      limit: _page ? CoursesPerPage : null,
      order: [[sort, order]],
      include: [{ model: Order_item, include: Course }],
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
          data: orderList,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  getOneOrder: (req, res) => {
    /* 
    #swagger.tags = ['Orders']
    #swagger.summary = '取得指定使用者的訂單列表（admin only）'
    #swagger.security = [{
      "Bearer": []
    }] 
    */
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
  getOrders: (req, res) => {
    /* 
    #swagger.tags = ['Orders']
    #swagger.summary = '取得所有的訂單列表（admin only）'
    #swagger.security = [{
      "Bearer": []
    }] 
    #swagger.parameters['_page'] = {
      in: 'query',
      description: '分頁(預設每頁五筆)',
      type: 'number',
    }
    #swagger.parameters['_limit'] = {
      in: 'query',
      description: '搭配分頁參數可調整每頁資料數目',
      type: 'number',
    }
    #swagger.parameters['_sort'] = {
      in: 'query',
      description: '排序依據(預設 id)',
      type: 'array',
      items: {
        type: 'string',
        enum: [
          'id',
          'sumPrice',
          'createdAt'
        ],
        default: 'id'
      }
    }
    #swagger.parameters['_order'] = {
      in: 'query',
      description: '排序方式(預設遞增)',
      type: 'array',
      items: {
        type: 'string',
        enum: [
          'ASC',
          'DESC'
        ],
        default: 'ASC'
      }
    }
    */
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
  receiveOrder: async (req, res) => {
    /* 
    #swagger.tags = ['Orders']
    #swagger.summary = '送出訂單'
    #swagger.security = [{
      "Bearer": []
    }]
    #swagger.parameters['obj'] = {
      in: 'body',
      description: '訂單資料',
      required: true,
      type: 'object',
      schema: {
        $sumPrice: 1000,
        orderCourses: [
          {'CourseId': 1, 'amountPaid': 1000}
        ],
        name: '購買人姓名（免費課程可不填）',
        $paymentType: '付款方式（免費課程可不填）',
      }
    }
    */
    const { name, orderCourses, paymentType, sumPrice } = req.body;
    if (sumPrice < 0 || !orderCourses) {
      return res.status(400).json({
        ok: 0,
        errorMessage: '資料不齊全或格式錯誤',
      });
    }
    if (sumPrice !== 0 && (!name || !paymentType)) {
      return res.status(400).json({
        ok: 0,
        errorMessage: '資料不齊全或格式錯誤',
      });
    }
    // 檢查有無重複購買或非公開課程
    let newOrderId;
    try {
      // 開始 transaction 全部成功或全部失敗
      // 依照付款資料授權課程給 user
      await sequelize.transaction(async (t) => {
        const newOrder = await Order.create(
          {
            // 身分驗證
            UserId: req.userId,
            sumPrice,
            orderCourses: JSON.stringify(orderCourses),
            // 非免費課程才要填
            name: name || '免費課程',
            paymentType: paymentType || '免費課程',
            // 付款驗證
            isPaid: true,
          },
          { transaction: t }
        );
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
      if (sumPrice === 0) {
        return res.status(200).json({
          ok: 1,
          message: `加入課程成功, 您的訂單編號為: ${newOrderId}`,
        });
      }
      return res.status(200).json({
        ok: 1,
        message: `付款成功, 您的訂單編號為: ${newOrderId}`,
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
