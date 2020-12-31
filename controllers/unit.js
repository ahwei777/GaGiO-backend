const db = require("../models");
const { Unit, Course, Teacher } = db;

const unitController = {
  getUnitByCourseId: (req, res) => {
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
                unit_list: units.unit_list.unit_list,
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
  getUnitById: (req, res) => {
    const unitId = req.params.id;
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
    const { teacherId } = res.locals;
    const { courseId, unit_list } = req.body;
    if (!courseId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "Course Id is required !",
      });
    Unit.create({
      CourseId: courseId,
      TeacherId: teacherId,
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
    const unitListToJSON = JSON.stringify(req.body.unitList);
    if (!unitListId)
      return res.status(400).json({
        ok: 0,
        errorMessage: "No unit list id",
      });
    const { unitList } = req.body;
    Unit.findByPk(unitListId)
      .then((result) => {
        if (!result)
          return res.status(404).json({
            ok: 0,
            errorMessage: "Cannot find unit !",
          });
        Unit.update(
          {
            unitListToJSON,
          },
          { where: { id: unitListId } }
        )
          .then((updatedUnit) => {
            return res.status(200).json({
              ok: 1,
              data: {
                unitList,
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
