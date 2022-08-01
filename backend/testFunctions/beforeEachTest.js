const app = require("../app");
const request = require("supertest");

exports.createEmployee = async () => {
  await request(app).post("/hrManagers/addEmployee").send({
    firstName: "Practice",
    lastName: "Test",
    gender: "M",
    birthDate: "1999-10-10",
    empNum: "8888888",
    role: "staff",
    department: "d005",
    hireDate: "1999-01-01",
    salary: "100000"
  });
};
