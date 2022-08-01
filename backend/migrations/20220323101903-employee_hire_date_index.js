"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex("employees", ["hire_date"], {
      name: "hire_date_idx",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex("employees", ["hire_date"], {
      name: "hire_date_idx",
    });
  },
};
