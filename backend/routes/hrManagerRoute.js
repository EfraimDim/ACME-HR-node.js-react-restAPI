const express = require('express');
const router = express.Router();
const hrManagersController = require('../controllers/hrManagerController');

const {
    validateBody,
    checkEmployeeNumberAvailable,
    checkEmployeeNumberExists
  } = require('../middleware/middleware');

const schemas = require('../schemas/allSchemas');

router.get(
  '/getMyOrganisationInfo',
  hrManagersController.getMyOrganisationInfo
);

router.post(
  '/addEmployee',
  validateBody(schemas.addorEditEmployeeSchemaAJV),
  checkEmployeeNumberAvailable,
  hrManagersController.addEmployee
);

router.put(
  '/editEmployee',
  validateBody(schemas.addorEditEmployeeSchemaAJV),
  hrManagersController.editEmployee
);

router.put(
  '/editEmployeeRole',
  validateBody(schemas.editEmployeeRoleSchemaAJV),
  hrManagersController.editEmployeeRole
);

router.put(
  '/editEmployeeDepartment',
  validateBody(schemas.editEmployeeDepartmentSchemaAJV),
  hrManagersController.editEmployeeDepartment
);

router.put(
  '/editEmployeeSalary',
  validateBody(schemas.editEmployeeSalarySchemaAJV),
  hrManagersController.editEmployeeSalary
);

router.post(
  '/addDepartment',
  validateBody(schemas.addDepartmentSchemaAJV),
  checkEmployeeNumberExists,
  hrManagersController.addDepartment
);

router.post(
  '/addTitle',
  validateBody(schemas.addTitleSchemaAJV),
  hrManagersController.addTitle
);


module.exports = router;
