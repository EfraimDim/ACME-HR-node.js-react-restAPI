const { DeptEmp } = require("../../../models/modelRelations");
const ACTIVE_EMPLOYEE_TO_DATE = require("../../querieConstants");

module.exports.addNewEmployeeDepartment = async (empNum, department, currentDate) => {
  try {
    await DeptEmp.create({ emp_no: empNum, dept_no: department, from_date: currentDate, to_date: ACTIVE_EMPLOYEE_TO_DATE });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
