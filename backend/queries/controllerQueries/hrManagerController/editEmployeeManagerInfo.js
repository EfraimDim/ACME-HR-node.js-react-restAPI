const { Sequelize, Op } = require("sequelize");
const { DeptManager } = require("../../../models/modelRelations");
const ACTIVE_EMPLOYEE_TO_DATE = require("../../querieConstants");

module.exports.editCurrentEmployeeDeptManagerInfo = async (empNum, currentDate) => {
  try {
    await DeptManager.update(
      { to_date: currentDate },
      {
        where: {
          [Op.and]: [{ emp_no: empNum}, {to_date: ACTIVE_EMPLOYEE_TO_DATE }],
        },
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
