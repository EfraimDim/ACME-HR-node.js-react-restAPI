const { Op } = require("sequelize");
const { Title } = require("../../../models/modelRelations");
const ACTIVE_EMPLOYEE_TO_DATE = require("../../querieConstants");

module.exports.editCurrentEmployeeTitleInfo = async (empNum, newToDate) => {
  try {
    await Title.update(
      { to_date: newToDate },
      {
        where: {
          [Op.and]: [{ emp_no: empNum}, {to_date: ACTIVE_EMPLOYEE_TO_DATE }],
        },
      }
    );
  } catch (e) {
    console.log(e);
    res.status(500).send(e.message);
  }
};
