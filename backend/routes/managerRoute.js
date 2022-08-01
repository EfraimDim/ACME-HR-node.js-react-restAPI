const express = require('express');
const router = express.Router();
const managersController = require('../controllers/managerController');

router.get(
  '/getEmployeeDetails',
  managersController.getEmployeeDetails
);

router.get(
  '/getMyDepartmentInfo',
  managersController.getMyDepartmentInfo
);

module.exports = router;
