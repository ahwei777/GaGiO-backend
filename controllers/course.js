const db = require('../models');
const { Op } = require('sequelize');
const { Course, Teacher, Order, Order_item, Unit } = db;
const { sequelize } = require('../models');

const courseController = {
  getAllCourses: (req, res) => {
    /* 
    #swagger.tags = ['Courses']
    #swagger.summary = '取得所有課程資料'
    #swagger.description = '非管理員只能取得已公開課程'
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
          'price',
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
    #swagger.parameters['_teacher_id'] = {
      in: 'query',
      description: '指定老師 ID',
      type: 'number',
    }
    #swagger.parameters['_keyword'] = {
      in: 'query',
      description: '指定課程標題關鍵字',
      type: 'string',
    }
    */
    const { _page, _limit, _sort, _order, _teacher_id, _keyword } = req.query;
    console.log(_keyword)
    let CoursesPerPage = Number(_limit) || 5;
    let sort = _sort || 'id';
    let order = _order || 'ASC';
    let where = {
      deletedAt: null,
      title: {
        [Op.substring]: _keyword ? `${_keyword}` : '',
      },
    };
    // 管理員才可取得非公開課程
    if (req.authTypeId !== 3) {
      where.isPublic = 1;
    }
    if (_teacher_id) {
      where.TeacherId = Number(_teacher_id);
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
    /*
    #swagger.tags = ['Courses']
    #swagger.summary = '取得所有課程資料'
    #swagger.description = '非管理員只能取得已公開課程'
    #swagger.security = [{
      "Bearer": []
    }] 
    */
    let where = {
      deletedAt: null,
      id: req.params.courseId,
    };
    // 管理員才可取得非公開課程
    if (req.authTypeId !== 3) {
      where.isPublic = 1;
    }
    Course.findOne({
      where,
      include: [Unit, Teacher, { model: Order_item, include: Order }],
    })
      .then((result) => {
        console.log('result', result);
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
        const unit_list = JSON.parse(result.Unit.unit_list);
        return res.status(200).json({
          ok: 1,
          data: {
            id: result.id,
            title: result.title,
            description: result.description,
            price: result.price,
            imgUrl: result.imgUrl,
            isPublic: result.isPublic,
            createdAt: result.createdAt,
            updatedAt: result.updatedAt,
            Teacher: { ...result.Teacher.dataValues },
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
    /* 
    #swagger.tags = ['Courses']
    #swagger.summary = '新增課程（teacher only）'
    #swagger.security = [{
      "Bearer": []
    }] 
    #swagger.parameters['obj'] = {
      in: 'body',
      description: '課程資料',
      required: true,
      type: 'object',
      schema: {
        $title: '課程標題',
        $description: '課程介紹',
        $price: '課程價格',
        $imgUrl: '課程縮圖'
      }
    }
    */
    const { title, description, price, imgUrl } = req.body;
    // 金額為非負整數
    const isPriceValid = /^\d+$/;
    if (!title || !description || !isPriceValid.test(price)) {
      console.log('error type');
      return res.status(400).json({
        ok: 0,
        errorMessage: '資料不齊全或格式錯誤',
      });
    }
    Course.create({
      TeacherId: req.teacherId,
      title,
      description,
      price,
      imgUrl,
      isPublic: false,
    })
      .then((newCourse) => {
        // 建立空陣列 unit_list
        Unit.create({
          CourseId: newCourse.id,
          unit_list: JSON.stringify([]),
        }).then((result) => {
          if (result) {
            return res.status(200).json({
              ok: 1,
              message: 'success',
            });
          }
        });
      })
      .catch((error) => {
        return res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        });
      });
  },
  /* 暫不提供刪除課程
  deleteCourse: (req, res) => {
    Course.update(
      { deletedAt: new Date() },
      {
        where: {
          // 為原開課者才可刪除
          TeacherId: req.teacherId,
          deletedAt: null,
          id: req.params.courseId,
        },
      }
    )
      .then((result) => {
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
  */
  updateCourse: async (req, res) => {
    /* 
    #swagger.tags = ['Courses']
    #swagger.summary = '更新指定課程資料（teacher only）'
    #swagger.security = [{
      "Bearer": []
    }] 
    #swagger.parameters['obj'] = {
      in: 'body',
      description: '課程資料',
      required: true,
      type: 'object',
      schema: {
        $title: '課程標題',
        $description: '課程介紹',
        $price: '課程價格',
        $imgUrl: '課程縮圖',
        $isPublic: true,
        unit_list: [
          {id:1,"title":"Writing a React component","description":"","videoUrl":'https://www.youtube.com/watch?v=0lrHhK5wYgo'}
        ]
      }
    }
    */
    const courseId = req.params.courseId;
    const { title, description, price, isPublic, unit_list, imgUrl } = req.body;
    if (
      !title ||
      !description ||
      price < 0 ||
      isPublic === undefined ||
      !unit_list ||
      !imgUrl
    ) {
      return res.status(400).json({
        ok: 0,
        errorMessage: '資料不齊全',
      });
    }
    try {
      // 開始 transaction 全部成功或全部失敗
      await sequelize.transaction(async (t) => {
        // 更改課程
        const updateCourse = await Course.update(
          {
            title,
            description,
            price,
            isPublic,
            imgUrl,
          },
          {
            where: {
              id: courseId,
            },
          },
          { transaction: t }
        );
        if (!updateCourse[0]) {
          return res.status(403).json({
            ok: 0,
            errorMessage: 'permission denied',
          });
        }
        // 更改 unit
        const updateUnit = await Unit.update(
          {
            unit_list: JSON.stringify(unit_list),
          },
          { where: { CourseId: courseId } },
          { transaction: t }
        );
        if (updateUnit[0] !== 1) {
          return res.status(404).json({
            ok: 0,
            errorMessage: 'Cannot find course !',
          });
        }
        // 完成
        return res.status(200).json({
          ok: 1,
          message: 'success',
        });
      });
    } catch (error) {
      // 捕捉其他預期外的錯誤並印出
      return res.status(400).json({
        ok: 0,
        errorMessage: error.toString(),
      });
    }
  },
  getMyBoughtCourses: (req, res) => {
    /* 
    #swagger.tags = ['Courses']
    #swagger.summary = '取得自已購買的課程列表'
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
          'price',
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
  getMyTeachCourses: (req, res) => {
    /* 
    #swagger.tags = ['Courses']
    #swagger.summary = '取得自己開設的課程列表（teacher only）'
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
          'price',
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
    Course.findAll({
      where: {
        deletedAt: null,
        TeacherId: req.teacherId,
      },
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
  getBoughtCourses: (req, res) => {
    /* 
    #swagger.tags = ['Courses']
    #swagger.summary = '取得指定使用者購買的課程列表（admin only）'
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
          'price',
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
  getDetailCourse: (req, res) => {
    /* 
    #swagger.tags = ['Courses']
    #swagger.summary = '取得指定課程的詳細教材內容'
    #swagger.security = [{
      "Bearer": []
    }]
    */
    // 必帶 params 不必檢查空值
    const { courseId } = req.params;
    Course.findOne({
      where: { id: courseId },
      include: [Unit],
    })
      .then((data) => {
        if (!data)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'No available courses',
          });
        return res.status(200).json({
          ok: 1,
          data: {
            id: data.id,
            title: data.title,
            description: data.description,
            price: data.price,
            imgUrl: data.imgUrl,
            teacherId: data.TeacherId,
            isPublic: data.isPublic,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            unit_list: data.Unit.unit_list,
          },
        });
      })
      .catch((error) =>
        res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        })
      );
  },
  getUnitByUnitId: (req, res) => {
    /* 
    #swagger.tags = ['Courses']
    #swagger.summary = '取得指定課程下的指定單元'
    #swagger.security = [{
      "Bearer": []
    }]
    */
    const courseId = req.params.courseId;
    const unitId = req.params.unitId;
    if (!unitId)
      return res.status(400).json({
        ok: 0,
        errorMessage: 'No unit id',
      });
    Unit.findOne({
      where: { CourseId: courseId },
      include: [Course],
    })
      .then((data) => {
        const unit = JSON.parse(data.unit_list).filter(
          (item) => item.id === Number(unitId)
        );
        if (unit.length === 0)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'Cannot find unit !',
          });
        return res.status(200).json({
          ok: 1,
          data: {
            courseId: data.Course.id,
            courseTitle: data.Course.title,
            ...unit[0],
          },
        });
      })
      .catch((error) =>
        res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        })
      );
  },
  updateUnitByUnitId: async (req, res) => {
    /* 
    #swagger.tags = ['Courses']
    #swagger.summary = '更新指定課程下的指定單元資料'
    #swagger.security = [{
      "Bearer": []
    }] 
    #swagger.parameters['obj'] = {
      in: 'body',
      description: '單元資料',
      required: true,
      type: 'object',
      schema: {
        $unit: {
          $title: '單元標題',
          description: '單元內容',
          videoUrl: 'https://www.youtube.com/watch?v=0lrHhK5wYgo',
        }
      }
    }
    */
    const courseId = req.params.courseId;
    const unitId = req.params.unitId;
    const { unit } = req.body;
    if (!unit)
      return res.status(400).json({
        ok: 0,
        errorMessage: 'missing necessary fields',
      });
    try {
      const oldUnit = await Unit.findOne({
        where: { CourseId: courseId },
      });
      if (!oldUnit) {
        return res.status(400).json({
          ok: 0,
          errorMessage: 'No available unit',
        });
      }
      const newUnitList = JSON.parse(oldUnit.unit_list).map((item) => {
        if (item.id === Number(unitId)) {
          return {
            id: item.id,
            title: unit.title,
            description: unit.description,
            videoUrl: unit.videoUrl,
          };
        } else {
          return item;
        }
      });
      const updatedRows = await Unit.update(
        {
          unit_list: JSON.stringify(newUnitList),
        },
        { where: { CourseId: courseId } }
      );
      if (updatedRows[0] === 0) {
        return res.status(400).json({
          ok: 0,
          errorMessage: 'update failed',
        });
      }
      return res.status(200).json({
        ok: 1,
        message: 'success',
      });
    } catch (error) {
      res.status(400).json({
        ok: 0,
        errorMessage: error.toString(),
      });
    }
  },
  // addUnit
  // deleteUnit
};

module.exports = courseController;
