const { getAllEmployees } = require("../queries/getAllEmployees");
const { getEmployeeDepartmentInfo } = require("../queries/getEmployeeDepartmentInfo");
const { getEmployeeSalaryInfo } = require("../queries/getEmployeeSalaryInfo");
const { getEmployeeTitleInfo } = require("../queries/getEmployeeTitleInfo");
const { getTitlesList } = require("../queries/getTitlesList");
const { totalActiveEmployees } = require("../queries/getTotalEmployeeCount");

exports.login = async (req, res) => {
  try {
    const colleagues = await getAllEmployees(1000, 0);
    const totalEmployeeCount = await totalActiveEmployees();
    const user = req.user;
    let titlesList = [];
    if (user.dataValues.accessibility === "managerHR") {
      titlesList = await getTitlesList();
    }
    res.send({
      user,
      totalEmployeeCount,
      colleagues,
      titlesList,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.getMyInformation = async (req, res) => {
  try {
    const { employeeID } = req.query;
    const deptInfo = await getEmployeeDepartmentInfo(employeeID);
    const salaryInfo = await getEmployeeSalaryInfo(employeeID);
    const titleInfo = await getEmployeeTitleInfo(employeeID);
    res.send({
      deptInfo,
      salaryInfo,
      titleInfo,
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.getNextGroupColleagues = async (req, res) => {
  try {
    const { offset } = req.query;
    const newColleagues = await getAllEmployees(1000, offset);
    res.send(newColleagues);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

