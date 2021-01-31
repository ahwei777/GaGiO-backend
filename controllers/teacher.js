const db = require('../models');
const { Course, Teacher, User } = db;
const { sequelize } = require('../models');

const teacherController = {
  getTeacherList: (req, res) => {
    /* 
    #swagger.tags = ['Teachers']
    #swagger.summary = '取得所有老師資料'
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
    let where = {
      deletedAt: null,
      isPublic: 1,
    };
    if (req.authTypeId === 3) {
      where = {
        deletedAt: null,
      };
    }
    Teacher.findAll({
      include: [{ model: Course, where }],
      offset: _page ? (_page - 1) * CoursesPerPage : 0,
      limit: _page ? CoursesPerPage : null,
      order: [[sort, order]],
    })
      .then((teacherList) => {
        if (teacherList.length === 0)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'No available teachers',
          });
        return res.status(200).json({
          ok: 1,
          data: {
            teacherList,
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
  getTeacher: (req, res) => {
    /* 
    #swagger.tags = ['Teachers']
    #swagger.summary = '取得指定老師資料'
    #swagger.security = [{
      "Bearer": []
    }] 
    */
    let where = {
      deletedAt: null,
      isPublic: 1,
    };
    if (req.authTypeId === 3) {
      where = {
        deletedAt: null,
      };
    }
    Teacher.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: Course,
          where,
        },
      ],
    })
      .then((teacher) => {
        if (!teacher)
          return res.status(404).json({
            ok: 0,
            errorMessage: 'Cannot find teacher',
          });
        return res.status(200).json({
          ok: 1,
          data: {
            teacher,
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
  addTeacher: async (req, res) => {
    /* 
    #swagger.tags = ['Teachers']
    #swagger.summary = '申請成為老師'
    #swagger.security = [{
      "Bearer": []
    }] 
    */
    const { name, description, avatarUrl } = req.body;
    if (!name || !description || !avatarUrl) {
      return res.status(400).json({
        ok: 0,
        errorMessage: '資料不齊全',
      });
    }
    try {
      const findTeacher = await Teacher.findOne({
        where: { UserId: req.userId },
      });
      console.log('findTeacher', findTeacher);
      if (findTeacher) {
        return res.status(403).json({
          ok: 0,
          errorMessage: '已申請成功，請勿重複申請',
        });
      }
      // transaction 全部成功或全部失敗
      await sequelize.transaction(async (t) => {
        const result = await Teacher.create(
          {
            UserId: req.userId,
            name,
            description,
            avatarUrl,
          },
          { transaction: t }
        );
        const update = await User.update(
          {
            AuthTypeId: 2,
          },
          { where: { id: req.userId } },
          { transaction: t }
        );
        if (update[0] === 1) {
          return res.status(200).json({
            ok: 1,
            message: 'success',
          });
        }
      });
    } catch (error) {
      return res.status(400).json({
        ok: 0,
        errorMessage: error.toString(),
      });
    }
  },
  updateTeacherInfo: async (req, res) => {
    /* 
    #swagger.tags = ['Teachers']
    #swagger.summary = '更改自己設定的老師資料（teacher only）'
    #swagger.security = [{
      "Bearer": []
    }] 
    */
    const { name, description, avatarUrl } = req.body;
    if (!name || !description || !avatarUrl) {
      return res.status(400).json({
        ok: 0,
        errorMessage: '資料不齊全',
      });
    }
    try {
      const update = await Teacher.update(
        {
          name,
          description,
          avatarUrl,
        },
        { where: { id: req.teacherId } }
      );
      if (update[0] === 1) {
        return res.status(200).json({
          ok: 1,
          message: 'success',
        });
      }
    } catch (error) {
      return res.status(400).json({
        ok: 0,
        errorMessage: error.toString(),
      });
    }
  },
};

module.exports = teacherController;
