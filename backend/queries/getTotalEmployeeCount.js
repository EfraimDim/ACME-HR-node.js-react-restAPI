const { DeptEmp } = require("../models/modelRelations");
const ACTIVE_EMPLOYEE_TO_DATE = require("./querieConstants");

module.exports.totalActiveEmployees = async (employeeID) => {
  try {
    return await DeptEmp.count({
      where: {
        to_date: ACTIVE_EMPLOYEE_TO_DATE,
      }
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};