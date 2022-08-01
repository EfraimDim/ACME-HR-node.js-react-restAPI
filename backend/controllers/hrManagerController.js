const sanitizeHtml = require("sanitize-html");
const { addNewEmployee } = require("../queries/controllerQueries/hrManagerController/addEmployee");
const { editCurrentEmployeeBasicInfo } = require("../queries/controllerQueries/hrManagerController/editEmployeeInfoBasic");
const { editCurrentEmployeeDepartmentInfo } = require("../queries/controllerQueries/hrManagerController/editEmployeeDepartmentInfo");
const { editCurrentEmployeeTitleInfo } = require("../queries/controllerQueries/hrManagerController/editEmployeeTitleInfo");
const { addNewEmployeeDepartment } = require("../queries/controllerQueries/hrManagerController/addNewEmployeeDepartmentInfo");
const { addNewEmployeeTitle } = require("../queries/controllerQueries/hrManagerController/addNewEmployeeTitleInfo");
const { addNewEmployeeDeptManager } = require("../queries/controllerQueries/hrManagerController/addNewEmployeeDeptManagerInfo");
const { editCurrentEmployeeDeptManagerInfo } = require("../queries/controllerQueries/hrManagerController/editEmployeeManagerInfo");
const { editCurrentEmployeeSalaryInfo } = require("../queries/controllerQueries/hrManagerController/editEmployeeSalaryInfo");
const { addNewEmployeeSalary } = require("../queries/controllerQueries/hrManagerController/addNewEmployeeSalaryInfo");
const { addNewDepartment } = require("../queries/controllerQueries/hrManagerController/addDepartment");
const { addNewTitle } = require("../queries/controllerQueries/hrManagerController/addTitle");
const { getDepartmentInfoForHR } = require("../queries/getDepartmentInfoForHR");
const { getDepartmentManagerInfoForHR } = require("../queries/getDepartmentManagerInfoForHR");

exports.getMyOrganisationInfo = async (req, res) => {
  try {
    const managersList = await getDepartmentManagerInfoForHR();
    const departmentList = await getDepartmentInfoForHR();
    departmentList.pop();
    const deptWithManagersList = departmentList.map((department) => {
      const managerOfDepartment = managersList.filter((manager) => manager.dataValues.dept_no === department["Departments.dept_no"]);
      department.manager = managerOfDepartment[0].dataValues.Employee;
      return department;
    });
    res.send(deptWithManagersList);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.addEmployee = async (req, res) => {
  try {
    const { firstName, lastName, gender, birthDate, empNum, role, department, hireDate, salary } = req.body;
    const newEmployee = { firstName, lastName, gender, birthDate, empNum, role, department, hireDate, salary };
    await addNewEmployee(newEmployee);
    res.send({ message: `${sanitizeHtml(firstName)} ${sanitizeHtml(lastName)} added to database!` });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.editEmployee = async (req, res) => {
  try {
    const { firstName, lastName, gender, birthDate, empNum, role, department, hireDate, originalDeptNo, originalRole, currentDate } = req.body;
    await editCurrentEmployeeBasicInfo(firstName, lastName, gender, birthDate, empNum, hireDate);
    if (role !== originalRole) {
      await editCurrentEmployeeTitleInfo(empNum, currentDate);
      await addNewEmployeeTitle(empNum, role, currentDate);
    }
    if (department !== originalDeptNo) {
      await editCurrentEmployeeDepartmentInfo(empNum, currentDate);
      await addNewEmployeeDepartment(empNum, department, currentDate);
    }
    if (role === "Manager" && originalRole !== "Manager") {
      await addNewEmployeeDeptManager(empNum, department, currentDate);
    }
    if (originalRole === "Manager" && role !== "Manager") {
      await editCurrentEmployeeDeptManagerInfo(empNum, currentDate);
    }
    res.send({ message: `Information updated to the database!` });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.editEmployeeRole = async (req, res) => {
  try {
    const { empNum, departmentNo, originalRole, newRole, newRoleStartDate } = req.body;
    await editCurrentEmployeeTitleInfo(empNum, newRoleStartDate);
    await addNewEmployeeTitle(empNum, newRole, newRoleStartDate);
    if (newRole === "Manager" && originalRole !== "Manager") {
      await addNewEmployeeDeptManager(empNum, departmentNo, newRoleStartDate);
    }
    if (originalRole === "Manager" && newRole !== "Manager") {
      await editCurrentEmployeeDeptManagerInfo(empNum, newRoleStartDate);
    }
    res.send({ message: `Information updated to the database!` });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.editEmployeeDepartment = async (req, res) => {
  try {
    const { empNum, newDepartmentNo, newDepartmentStartDate } = req.body;
    await editCurrentEmployeeDepartmentInfo(empNum, newDepartmentStartDate);
    await addNewEmployeeDepartment(empNum, newDepartmentNo, newDepartmentStartDate);
    res.send({ message: `Information updated to the database!` });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.editEmployeeSalary = async (req, res) => {
  try {
    const { empNum, newSalary, newSalaryStartDate } = req.body;
    await editCurrentEmployeeSalaryInfo(empNum, newSalaryStartDate);
    await addNewEmployeeSalary(empNum, newSalary, newSalaryStartDate);
    res.send({ message: `Information updated to the database!` });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.addDepartment = async (req, res) => {
  try {
    const { deptNo, deptName, managersEmpNum, startDate, currentRole, newManager } = req.body;
    await addNewDepartment(deptNo, deptName);
    await editCurrentEmployeeDepartmentInfo(managersEmpNum, startDate);
    await addNewEmployeeDepartment(managersEmpNum, deptNo, startDate);
    await editCurrentEmployeeTitleInfo(managersEmpNum, startDate);
    await addNewEmployeeTitle(managersEmpNum, "Manager", startDate);
    if (currentRole === "Manager") {
      await editCurrentEmployeeDeptManagerInfo(managersEmpNum, startDate);
    }
    await addNewEmployeeDeptManager(managersEmpNum, deptNo, startDate);
    const { first_name, last_name } = newManager;
    const cleanManagersDetails = { firstName: sanitizeHtml(first_name), lastName: sanitizeHtml(last_name) };
    res.send({ message: `Department added to the database!`, newManager: cleanManagersDetails });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};

exports.addTitle = async (req, res) => {
  try {
    const { titleName } = req.body;
    console.log(titleName);
    await addNewTitle(titleName);
    res.send({ message: `Title added to the database!` });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
