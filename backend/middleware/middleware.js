const { Employee } = require("../models/modelRelations");
const { currentDepManager } = require("../queries/middlewareQueries/checkAccessibilityQuery");
const { getDepartmentEmployees } = require("../queries/controllerQueries/managerController/depEmpsForManagersQuery");
const { findNewManagersCurrentRole } = require("../queries/middlewareQueries/findNewManagersCurrentRole");
const Ajv = require("ajv");
const ajv = new Ajv();
const addFormats = require("ajv-formats");
addFormats(ajv);

exports.validateBody = (schema) => {
  return (req, res, next) => {
    try {
      const valid = ajv.validate(schema, req.body);
      if (!valid) {
        res.status(400).send(ajv.errors[0]);
      } else {
        next();
      }
    } catch (e) {
      console.log(e);
      res.status(500).send(e.message);
    }
  };
};

exports.checkPassword = async (req, res, next) => {
  try {
    const { employeeID, password } = req.body;
    const user = await Employee.findByPk(employeeID);
    if (user.dataValues.birth_date === password) {
      req.user = user;
      next();
    } else {
      res.status(400).send({ message: "Incorrect Password" });
    }
  } catch (e) {
    console.error(e);
    res.status(400).send({ message: "Incorrect EmployeeID" });
  }
};

exports.checkAccessibility = async (req, res, next) => {
  try {
    const { employeeID } = req.body;
    const depManager = await currentDepManager(employeeID);
    if (depManager === null) {
      req.user.dataValues.accessibility = "regularEmp";
      next();
    } else if (depManager.dataValues.dept_no === "d003") {
      req.user.dataValues.accessibility = "managerHR";
      req.user.dataValues.dept_no = depManager.dataValues.dept_no;
      next();
    } else {
      req.user.dataValues.accessibility = "manager";
      req.user.dataValues.dept_no = depManager.dataValues.dept_no;
      next();
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

exports.checkEmployeeNumberAvailable = async (req, res, next) => {
  try {
    const { empNum } = req.body;
    const empNumAvailable = await Employee.findByPk(empNum);
    if (empNumAvailable) {
      res.status(400).send({ message: "Employee Number Taken" });
    } else {
      next();
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};

exports.checkEmployeeNumberExists = async (req, res, next) => {
  try {
    const { managersEmpNum } = req.body;
    const empNumExists = await Employee.findByPk(managersEmpNum);
    if (empNumExists) {
      const managersCurrentRole = await findNewManagersCurrentRole(managersEmpNum);
      req.body.currentRole = managersCurrentRole;
      req.body.newManager = empNumExists;
      next();
    } else {
      res.status(400).send({ message: "Employee Number Doesn't Exist" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send(e.message);
  }
};
