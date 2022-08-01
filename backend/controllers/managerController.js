const { Employee, Department } = require("../models/modelRelations");
const { getEmployeeDepartmentInfo } = require("../queries/getEmployeeDepartmentInfo");
const { getEmployeeSalaryInfo } = require("../queries/getEmployeeSalaryInfo");
const { getEmployeeTitleInfo } = require("../queries/getEmployeeTitleInfo");
const { getManagerOfEmployee } = require("../queries/controllerQueries/managerController/getManagerOfEmployee");
const { getDepartmentEmployees } = require("../queries/controllerQueries/managerController/depEmpsForManagersQuery");

exports.getMyDepartmentInfo = async (req, res) => {
  try {
    const { deptNo } = req.query;
    const department = await Department.findByPk(deptNo);
    const departmentEmployees = await getDepartmentEmployees(deptNo);
    res.send({ departmentEmployees, department });
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

exports.getEmployeeDetails = async (req, res) => {
  try {
    const { empNo, accessibility } = req.query;
    const user = await Employee.findByPk(empNo);
    const deptInfo = await getEmployeeDepartmentInfo(empNo);
    const salaryInfo = await getEmployeeSalaryInfo(empNo);
    const titleInfo = await getEmployeeTitleInfo(empNo);
    let employeesManager = "";
    if (accessibility === "managerHR") {
      employeesManager = await getManagerOfEmployee(deptInfo[0].dataValues.dept_no);
    }
    res.send({
      user,
      deptInfo,
      salaryInfo,
      titleInfo,
      employeesManager,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
