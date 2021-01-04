const db = require('../models');
const { Course, Teacher, Order, Order_item } = db;

const courseController = {
  getCourseList: (req, res) => {
    console.log(req.query);
    const { _page, _limit, _sort, _order, TeacherId } = req.query;
    let CoursesPerPage = Number(_limit) || 5;
    let sort = _sort || 'id';
    let order = _order || 'ASC';
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
            errorMessage: 'No available courses',
          });
        return res.status(200).json({
          ok: 1,
          data: {
            courseList,
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
      include: [Teacher, {model: Order_item, include: Order}],
    })
      .then((course) => {
        console.log('new', course)
        if (!course)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'Cannot find course or the course is non-public',
          });
        // 從已購買此堂課的 user 中尋找是否有當前使用者
        let isCourseBought = false;
        for (const record of course.Order_items) {
          console.log(record)
          if (req.userId === Number(record.Order.UserId)) {
            isCourseBought = true;
            break;
          }
        }
        return res.status(200).json({
          ok: 1,
          data: {
            course: {
              ...course.dataValues,
              isCourseBought,
            },
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
    if (!title || !description || !price) {
      return res.status(400).json({
        ok: 0,
        errorMessage: '資料不齊全',
      });
    }
    Course.create({
      TeacherId: req.TeacherId,
      title,
      description,
      price,
      imgUrl: 'https://i.imgur.com/q4rE8Sd.jpg',
      isPublic: false,
    })
      .then((result) => {
        console.log(result);
        // success
        return res.status(200).json({
          ok: 1,
          data: result,
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
        console.log(result);
        // success
        return res.status(200).json({
          ok: 1,
          data: result,
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
        errorMessage: '資料不齊全',
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
            message: 'No available course',
          });
        }
        // success
        return res.status(200).json({
          ok: 1,
          message: 'success',
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  getMyCourseList: (req, res) => {
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
      .then((myCourseList) => {
        console.log('myCourseList', myCourseList)
        if (myCourseList.length === 0)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'No available courses',
          });
        return res.status(200).json({
          ok: 1,
          data: {
            myCourseList,
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
};

module.exports = courseController;
