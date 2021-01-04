const { Op } = require("sequelize");
const db = require('../models');
const { sequelize } = require('../models');
const { Order, Paid_course, Cart_item } = db;

const orderController = {
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
    try {
      const setOrder = await Order.create({
        // 身分驗證
        UserId: req.userId,
        name,
        paymentType,
        sumPrice,
        orderCourses: JSON.stringify(orderCourses),
        // 付款驗證
        isPaid: true,
      });
      if (!setOrder) {
        return res.status(400).json({
          ok: 0,
          errorMessage: 'send order failed',
        });
      }

      // 開始 transaction 全部成功或全部失敗

      // 依照付款資料授權課程給 user
      await sequelize.transaction(async (t) => {
        await Paid_course.bulkCreate(
          orderCourses.map((el, i) => {
            return {
              // 身分驗證
              UserId: req.userId,
              CourseId: el.CourseId,
              amountPaid: el.amountPaid,
            };
          }),
          {
            returning: true,
          },
          { transaction: t }
        );

        // 刪除購物車內已有商品
        await Cart_item.update(
          // 設為已結帳
          { checkedOutAt: new Date() },
          {
            where: {
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
      console.log('收到訂單，orderId: ', setOrder.id);
      return res.status(200).json({
        ok: 1,
        data: {
          orderNumber: setOrder.id,
        }
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
  deleteCartItem: (req, res) => {
    Cart_item.update(
      { deletedAt: new Date() },
      {
        where: {
          // 權限管理
          UserId: req.userId,
          CourseId: req.params.id,
        },
      }
    )
      .then((result) => {
        console.log(result);
        // success
        return res.status(200).json({
          ok: 1,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
};

module.exports = orderController;
