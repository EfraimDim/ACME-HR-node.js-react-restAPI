const { Op } = require("sequelize");
const { DeptManager } = require("../../models/modelRelations");
const ACTIVE_EMPLOYEE_TO_DATE = require("../querieConstants");

module.exports.currentDepManager = async (employeeID) => {
  try {
    return await DeptManager.findOne({
      where: {
        [Op.and]: [{ emp_no: employeeID}, {to_date: ACTIVE_EMPLOYEE_TO_DATE }],
      },
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
