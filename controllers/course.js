const db = require("../models");
const { Course, Teacher, User, Unit } = db;

const courseController = {
  getCourseList: (req, res) => {
    const { _page, _limit, _sort, _order } = req.query;
    let CoursesPerPage = Number(_limit) || 5;
    let sort = _sort || "id";
    let order = _order || "ASC";
    let where = {
      deletedAt: null,
      isPublic: 1,
    };
    if (req.AuthTypeId === 3) {
      where = {
        deletedAt: null,
      };
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
    if (req.AuthTypeId === 3) {
      where = {
        deletedAt: null,
        id: req.params.id,
      };
    }
    Course.findOne({
      where,
      include: [Teacher],
    })
      .then((course) => {
        if (!course)
          return res.status(404).json({
            ok: 0,
            errorMessage: "Cannot find course or the course is non-public",
          });
        return res.status(200).json({
          ok: 1,
          data: {
            course,
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
        errorMessage: "資料不齊全",
      });
    }
    Course.create({
      // 登入後改從 session 取 UserId
      // const userId = req.session.userId;
      TeacherId: 1,
      title,
      description,
      price,
      imgUrl: "https://i.imgur.com/q4rE8Sd.jpg",
      isPublic: false,
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
  deleteCourse: (req, res) => {
    Course.update(
      { deletedAt: new Date() },
      {
        where: {
          // 為原開課者才可刪除
          // TeacherId: 1,
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
    if (!title || !description || !price || !isPublic) {
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
};

module.exports = courseController;
