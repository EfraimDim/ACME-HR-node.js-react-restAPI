const { Employee, Title } = require("../models/modelRelations");
const ACTIVE_EMPLOYEE_TO_DATE = require("./querieConstants");

module.exports.getAllEmployees = async (limit, offset) => {
  try {
    return await Employee.findAll({
      include: [
        {
          model: Title,
          attributes: ["title", "to_date"],
          required: true,
          where: {
            to_date: ACTIVE_EMPLOYEE_TO_DATE
          },
        },
      ],
      order: [["hire_date", "DESC"]],
      limit: limit,
      offset: offset
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
