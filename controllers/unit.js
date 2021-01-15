const db = require("../models");
const { Unit, Course, Teacher, User } = db;
const { checkToken } = require("../middleware/auth");

const unitController = {
  getAllUnitsByCourseId: (req, res) => {
    const { courseId } = req.query;
    console.log(courseId);
    if (!courseId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "No course id",
      });
    Course.findByPk(courseId)
      .then((course) => {
        if (!course)
          return res.status(404).json({
            ok: 0,
            errorMessage: "Cannot find course !",
          });
        Unit.findOne({
          where: { CourseId: courseId },
          attributes: ["id", "unit_list"],
        })
          .then((units) => {
            if (!units)
              return res.status(404).json({
                ok: 0,
                errorMessage: "Cannot find unit_list !",
              });
            res.status(200).json({
              ok: 1,
              data: {
                title: course.title,
                imgUrl: course.imgUrl,
                isPublic: course.isPublic,
                unit_list: JSON.parse(units.unit_list).unit_list,
              },
            });
          })
          .catch((error) =>
            res.status(400).json({
              ok: 0,
              errorMessage: error.toString(),
            })
          );
      })
      .catch((error) =>
        res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        })
      );
  },
  getUnitByUnitId: (req, res) => {
    const unitId = req.params.unitId;
    if (!unitId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "No unit id",
      });
    Unit.findByPk(unitId, { include: { model: Course, attributes: ["title"] } })
      .then((unit) => {
        if (!unit)
          return res.status(404).json({
            ok: 0,
            errorMessage: "Cannot find unit !",
          });
        return res.status(200).json({
          ok: 1,
          data: {
            unit,
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
  addUnit: (req, res) => {
    const userId = checkToken(req);
    const { courseId, unit_list } = req.body;
    if (!courseId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "Course Id is required !",
      });
    Unit.create({
      CourseId: courseId,
      unit_list,
    }).then((unit) => {
      return res.status(200).json({
        ok: 1,
        data: unit,
      });
    });
  },
  updateUnit: (req, res) => {
    const unitListId = req.params.id;
    const unit_list = req.body;
    if (!unitListId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "No unit list id",
      });
    Unit.findByPk(unitListId)
      .then((result) => {
        if (!result)
          return res.status(404).json({
            ok: 0,
            errorMessage: "Cannot find unit !",
          });
        Unit.update(
          {
            unit_list: JSON.stringify(unit_list),
          },
          { where: { id: unitListId } }
        )
          .then((updatedUnit) => {
            return res.status(200).json({
              ok: 1,
              data: {
                unit_list,
              },
            });
          })
          .catch((error) =>
            res.status(400).json({
              ok: 0,
              errorMessage: error.toString(),
            })
          );
      })
      .catch((error) =>
        res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        })
      );
  },
  deleteUnit: (req, res) => {
    const unitListId = req.params.id;
    if (!unitId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "No unit id",
      });
    Unit.findByPk(unitListId)
      .then((unitList) => {
        if (!unitList)
          return res.status(404).json({
            ok: 0,
            errorMessage: "Cannot find unit !",
          });
        Unit.destroy({ where: { id: unitId } })
          .then((result) => {
            return res.status(200).json({
              ok: 1,
              data: "success deleted",
            });
          })
          .catch((error) =>
            res.status(400).json({
              ok: 0,
              errorMessage: error.toString(),
            })
          );
      })
      .catch((error) =>
        res.status(400).json({
          ok: 0,
          errorMessage: error.toString(),
        })
      );
  },
};

module.exports = unitController;
