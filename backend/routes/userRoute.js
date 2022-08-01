const express = require('express');
const router = express.Router();
const usersController = require('../controllers/userController');
const {
  checkPassword,
  checkAccessibility,
  validateBody,
} = require('../middleware/middleware');

const schemas = require('../schemas/allSchemas');

router.post(
  '/login',
  validateBody(schemas.loginSchemaAJV),
  checkPassword,
  checkAccessibility,
  usersController.login
);

router.get(
  '/getMyInformation',
  usersController.getMyInformation
)

router.get(
  '/getNextGroupColleagues',
  usersController.getNextGroupColleagues
)

module.exports = router;
