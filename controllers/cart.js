const db = require('../models');
const { Cart_item, Course } = db;

const courseController = {
  getCartList: (req, res) => {
    const { _page, _limit, _sort, _order } = req.query;
    let CoursesPerPage = Number(_limit) || 5;
    let sort = _sort || 'id';
    let order = _order || 'ASC';
    Cart_item.findAll({
      where: {
        // 權限管理
        UserId: req.userId,
        deletedAt: null,
        checkedOutAt: null,
      },
      include: [Course],
      offset: _page ? (_page - 1) * CoursesPerPage : 0,
      limit: _page ? CoursesPerPage : null,
      order: [[sort, order]],
    })
      .then((cart_items) => {
        if (cart_items.length === 0)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'No available cart items',
          });
        return res.status(200).json({
          ok: 1,
          data: {
            cart_items,
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
  addCartItem: async (req, res) => {
    // 檢查購物車內是否已有重複課程
    const searchItem = await Cart_item.findOne({
      where: {
        UserId: req.userId,
        CourseId: req.params.id,
        deletedAt: null,
      }
    })
    if (searchItem !== null) {
      return res.status(400).json({
        ok: 0,
        errorMessage: "This course is already in your cart",
      });
    }
    // 檢查該課程是否公開
    const searchCourse = await Course.findByPk(req.params.id);
    if (!searchCourse.isPublic) {
      return res.status(400).json({
        ok: 0,
        errorMessage: "This course is non-public",
      });
    }
    Cart_item.create({
      // 權限管理
      UserId: req.userId,
      CourseId: req.params.id,
    })
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

module.exports = courseController;
