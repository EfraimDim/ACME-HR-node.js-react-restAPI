const { Sequelize, Op } = require("sequelize");
const { Salary } = require("../../../models/modelRelations");
const ACTIVE_EMPLOYEE_TO_DATE = require("../../querieConstants");

module.exports.editCurrentEmployeeSalaryInfo = async (empNum, newSalaryStartDate) => {
  try {
    await Salary.update(
      { to_date: newSalaryStartDate },
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
