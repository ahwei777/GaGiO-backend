const db = require("../models");
const { Course, Teacher, Order, Order_item, Unit } = db;

const courseController = {
  getCourseList: (req, res) => {
    const { _page, _limit, _sort, _order, TeacherId } = req.query;
    let CoursesPerPage = Number(_limit) || 5;
    let sort = _sort || "id";
    let order = _order || "ASC";
    let where = {
      deletedAt: null,
      isPublic: 1,
    };
    // 管理員才可取得非公開課程
    if (req.authTypeId === 3) {
      where = {
        deletedAt: null,
      };
    }
    if (TeacherId) {
      where.TeacherId = Number(TeacherId);
    }
    Course.findAll({
      where,
      include: [Teacher],
      offset: _page ? (_page - 1) * CoursesPerPage : 0,
      limit: _page ? CoursesPerPage : null,
      order: [[sort, order]],
    })
      .then((courseList) => {
        if (courseList.length === 0)
          return res.status(404).json({
            ok: 0,
            errorMessage: "No available courses",
          });
        return res.status(200).json({
          ok: 1,
          data: courseList,
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  getCourse: (req, res) => {
    let where = {
      deletedAt: null,
      id: req.params.id,
      isPublic: 1,
    };
    // 管理員才可取得非公開課程
    if (req.authTypeId === 3) {
      where = {
        deletedAt: null,
        id: req.params.id,
      };
    }
    Course.findOne({
      where,
      include: [Unit, Teacher, { model: Order_item, include: Order }],
    })
      .then((result) => {
        if (!result)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'Cannot find course or the course is non-public',
          });
        // 從已購買此堂課的 user 中尋找是否有當前使用者
        let isCourseBought = false;
        for (const record of result.Order_items) {
          console.log(record);
          if (req.userId === Number(record.Order.UserId)) {
            isCourseBought = true;
            break;
          }
        }
        // 整理 unitList
        const unit_list = JSON.parse(result.Unit.unit_list).unit_list;
        return res.status(200).json({
          ok: 1,
          data: {
            ...result.dataValues,
            unit_title: unit_list.map((el) => el.title),
            isCourseBought,
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
  addCourse: (req, res) => {
    const { title, description, price } = req.body;
    // 金額為非負整數
    const isPriceValid = /^\d+$/;
    if (!title || !description || !isPriceValid.test(price)) {
      console.log('error type')
      return res.status(400).json({
        ok: 0,
        errorMessage: '資料不齊全或格式錯誤',
      });
    }
    Course.create({
      TeacherId: req.TeacherId,
      title,
      description,
      price,
      imgUrl: "https://i.imgur.com/q4rE8Sd.jpg",
      isPublic: false,
    })
      .then((newCourse) => {
        // success
        Unit.create({
          CourseId: newCourse.id,
          TeacherId: req.TeacherId,
          unit_list: JSON.stringify({
            unit_list: [],
          }),
        }).then((result) => {
          return res.status(200).json({
            ok: 1,
            message: "success",
          });
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  deleteCourse: (req, res) => {
    Course.update(
      { deletedAt: new Date() },
      {
        where: {
          // 為原開課者才可刪除
          TeacherId: req.TeacherId,
          deletedAt: null,
          id: req.params.id,
        },
      }
    )
      .then((result) => {
        // success
        return res.status(200).json({
          ok: 1,
          message: "success",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  updateCourse: (req, res) => {
    const courseId = req.params.id;
    const { title, description, price, isPublic } = req.body;
    if (!title || !description || !price || isPublic === undefined) {
      return res.status(400).json({
        ok: 0,
        errorMessage: "資料不齊全",
      });
    }
    Course.update(
      {
        title,
        description,
        price,
        isPublic,
      },
      {
        where: {
          id: courseId,
          // 權限管理：只有自己開的課才能更改
          TeacherId: req.TeacherId,
        },
      }
    )
      .then((affectedRows) => {
        if (!affectedRows[0]) {
          return res.status(404).json({
            ok: 0,
            message: "No available course",
          });
        }
        // success
        return res.status(200).json({
          ok: 1,
          message: "success",
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  getMyBoughtCourse: (req, res) => {
    const { _page, _limit, _sort, _order } = req.query;
    let CoursesPerPage = Number(_limit) || 5;
    let sort = _sort || 'id';
    let order = _order || 'ASC';
    Order_item.findAll({
      where: { '$Order.UserId$': req.userId },
      include: [Order, { model: Course, include: [Teacher] }],
      offset: _page ? (_page - 1) * CoursesPerPage : 0,
      limit: _page ? CoursesPerPage : null,
      order: [[sort, order]],
    })
      .then((result) => {
        if (result.length === 0)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'No available courses',
          });
        return res.status(200).json({
          ok: 1,
          data: result.map((el) => el.Course),
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  getBoughtCourse: (req, res) => {
    const { _page, _limit, _sort, _order, UserId } = req.query;
    if (!UserId) {
      return res.status(404).json({
        ok: 0,
        errorMessage: 'UserId is necessary',
      });
    }
    let CoursesPerPage = Number(_limit) || 5;
    let sort = _sort || 'id';
    let order = _order || 'ASC';
    Order_item.findAll({
      where: { '$Order.UserId$': UserId },
      include: [Order, { model: Course }],
      offset: _page ? (_page - 1) * CoursesPerPage : 0,
      limit: _page ? CoursesPerPage : null,
      order: [[sort, order]],
    })
      .then((result) => {
        if (result.length === 0)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'No available courses',
          });
        return res.status(200).json({
          ok: 1,
          data: result.map((el) => el.Course),
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
