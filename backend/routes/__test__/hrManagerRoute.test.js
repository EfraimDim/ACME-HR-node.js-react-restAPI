const app = require("../../app");
const request = require("supertest");
const { Employee, Title, DeptEmp, Department } = require("../../models/modelRelations");
const { createEmployee } = require("../../testFunctions/beforeEachTest");
const { destroyeEmployee } = require("../../testFunctions/afterEachTest");

beforeEach(async () => {
  await createEmployee();
});

afterEach(async () => {
  await destroyeEmployee();
});

describe("Testing add employee hrManager route", () => {
  test("Test add employee route with correct details", async () => {
    const addEmployee = await request(app)
      .post("/hrManagers/addEmployee")
      .send({
        firstName: "John",
        lastName: "Smith",
        gender: "M",
        birthDate: "1994-01-01",
        empNum: "7777777",
        role: "staff",
        department: "d003",
        hireDate: "1999-01-01",
        salary: "100000",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    await Employee.destroy({
      where: {
        emp_no: "7777777",
      },
    });
    await Title.destroy({
      where: {
        emp_no: "7777777",
      },
    });
    await DeptEmp.destroy({
      where: {
        emp_no: "7777777",
      },
    });
    expect(typeof addEmployee.body).toBe("object");
    expect(addEmployee.body["message"]).toBeDefined();
    expect(addEmployee.body["message"]).toBe("John Smith added to database!");
  });
  test("Test hrManager route with missing details", async () => {
    await request(app)
      .post("/hrManagers/addEmployee")
      .send({
        firstName: "John",
        lastName: "Smith",
        gender: "M",
        birthDate: "1994-01-01",
        role: "staff",
        department: "d003",
        hireDate: "1999-01-01",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(
        `{"instancePath":"","schemaPath":"#/required","keyword":"required","params":{"missingProperty":"empNum"},"message":"must have required property 'empNum'"}`
      );
  });
  test("Test hrManager route with incorrect type details", async () => {
    await request(app)
      .post("/hrManagers/addEmployee")
      .send({
        firstName: "John",
        lastName: "Smith",
        gender: "M",
        birthDate: "1994-01-01",
        empNum: 999999,
        role: "staff",
        department: "d003",
        hireDate: "1999-01-01",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(
        '{"instancePath":"/empNum","schemaPath":"#/properties/empNum/type","keyword":"type","params":{"type":"string"},"message":"must be string"}'
      );
  });
});

describe("Testing edit employee all details hrManager route", () => {
  test("Test edit employee route with correct details", async () => {
    const editEmployee = await request(app)
      .put("/hrManagers/editEmployee")
      .send({
        firstName: "Testttt",
        lastName: "Practicccce",
        gender: "M",
        birthDate: "1992-10-22",
        empNum: "8888888",
        originalDeptNo: "d005",
        originalRole: "staff",
        role: "senior staff",
        department: "d004",
        hireDate: "1999-01-02",
        currentDate: "2020-01-01",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(typeof editEmployee.body).toBe("object");
    expect(editEmployee.body["message"]).toBeDefined();
    expect(editEmployee.body["message"]).toBe("Information updated to the database!");
  });
});

describe("Testing edit employee roles hrManager route", () => {
  test("Test edit employee roles route with correct details", async () => {
    const editEmployee = await request(app)
      .put("/hrManagers/editEmployeeRole")
      .send({
        empNum: "8888888",
        originalDeptNo: "d005",
        originalRole: "staff",
        newRole: "engineer",
        departmentNo: "d005",
        newRoleStartDate: "2020-01-01",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(typeof editEmployee.body).toBe("object");
    expect(editEmployee.body["message"]).toBeDefined();
    expect(editEmployee.body["message"]).toBe("Information updated to the database!");
  });
});

describe("Testing edit employee department hrManager route", () => {
  test("Test edit employee department route with correct details", async () => {
    const editEmployee = await request(app)
      .put("/hrManagers/editEmployeeDepartment")
      .send({
        empNum: "8888888",
        newDepartmentNo: "d008",
        newDepartmentStartDate: "2021-01-01",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(typeof editEmployee.body).toBe("object");
    expect(editEmployee.body["message"]).toBeDefined();
    expect(editEmployee.body["message"]).toBe("Information updated to the database!");
  });
});

describe("Testing edit employee salary hrManager route", () => {
  test("Test edit employee salary route with correct details", async () => {
    const editEmployee = await request(app)
      .put("/hrManagers/editEmployeeSalary")
      .send({
        empNum: "8888888",
        newSalary: "100000",
        newSalaryStartDate: "2022-03-03",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(typeof editEmployee.body).toBe("object");
    expect(editEmployee.body["message"]).toBeDefined();
    expect(editEmployee.body["message"]).toBe("Information updated to the database!");
  });
});

describe("Testing add department hrManager route", () => {
  test("Test add department route with correct details", async () => {
    const editEmployee = await request(app)
      .post("/hrManagers/addDepartment")
      .send({
        deptNo: "d023",
        deptName: "TestingDepart",
        managersEmpNum: "8888888",
        startDate: "2022-03-04",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    await Department.destroy({
      where: {
        dept_no: "d023",
      },
    });
    expect(typeof editEmployee.body).toBe("object");
    expect(editEmployee.body["message"]).toBeDefined();
    expect(editEmployee.body["message"]).toBe("Department added to the database!");
    expect(typeof editEmployee.body["newManager"]).toBe("object");
    expect(editEmployee.body["newManager"]).toBeDefined();
    expect(editEmployee.body["newManager"].firstName).toBe("Practice");
    expect(editEmployee.body["newManager"].lastName).toBe("Test");
  });
});
