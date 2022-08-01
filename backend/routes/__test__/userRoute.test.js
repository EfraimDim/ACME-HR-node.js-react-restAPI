const app = require("../../app");
const request = require("supertest");

const { createEmployee } = require("../../testFunctions/beforeEachTest");
const { destroyeEmployee } = require("../../testFunctions/afterEachTest");

beforeEach(async () => {
  await createEmployee();
});

afterEach(async () => {
  await destroyeEmployee();
});

describe("Testing users Login route", () => {
  test("Test login route with correct details", async () => {
    const login = await request(app)
      .post("/users/login")
      .send({ employeeID: "8888888", password: "1999-10-10" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(typeof login.body).toBe("object");
    expect(login.body["user"]).toBeDefined();
    expect(typeof login.body["user"]).toBe("object");
    expect(login.body["user"]).toHaveProperty("emp_no", "birth_date", "first_name", "last_name", "gender", "hire_date", "accesibility");
    expect(login.body["user"].emp_no).toBe("8888888");
    expect(login.body["user"].birth_date).toBe("1999-10-10");
    expect(login.body["user"].first_name).toBe("Practice");
    expect(login.body["user"].last_name).toBe("Test");
    expect(login.body["user"].gender).toBe("M");
    expect(login.body["user"].hire_date).toBe("1999-01-01");
    expect(typeof login.body["colleagues"]).toBe("object");
    expect(login.body["colleagues"][0]).toHaveProperty("emp_no", "birth_date", "first_name", "last_name", "gender", "hire_date", "Titles");
    // expect(typeof login.body["deptInfo"]).toBe("object");
    // expect(login.body["deptInfo"][0]).toHaveProperty("Department", "dept_no", "emp_no", "from_date", "to_date");
    // expect(typeof login.body["salaryInfo"]).toBe("object");
    // expect(login.body["salaryInfo"][0]).toHaveProperty("emp_no", "salary", "from_date", "to_date");
    // expect(typeof login.body["titleInfo"]).toBe("object");
    // expect(login.body["titleInfo"][0]).toHaveProperty("emp_no", "from_date", "to_date", "title");
  });
  test("Test login route with incorrect employeeID", async () => {
    await request(app)
      .post("/users/login")
      .send({ employeeID: "1111", password: "1953-04-21" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect('{"message":"Incorrect EmployeeID"}');
  });
  test("Test login route with incorrect password", async () => {
    await request(app)
      .post("/users/login")
      .send({ employeeID: "10100", password: "1953-04-22" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect('{"message":"Incorrect Password"}');
  });
  test("Test login route with incorrect schema constraints (password)", async () => {
    await request(app)
      .post("/users/login")
      .send({ employeeID: "10100", password: "1953-04-2244" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400)
      .expect(
        '{"instancePath":"/password","schemaPath":"#/properties/password/maxLength","keyword":"maxLength","params":{"limit":10},"message":"must NOT have more than 10 characters"}'
      );
  });
});

describe("Testing get employee information route", () => {
  test("Test get empInfo route with correct employee number", async () => {
    const empInfo = await request(app).get("/users/getMyInformation").query({ employeeID: "8888888" }).expect(200);
    expect(typeof empInfo.body["deptInfo"]).toBe("object");
    expect(empInfo.body["deptInfo"][0]).toHaveProperty("Department", "dept_no", "emp_no", "from_date", "to_date");
    expect(typeof empInfo.body["salaryInfo"]).toBe("object");
    expect(empInfo.body["salaryInfo"][0]).toHaveProperty("emp_no", "salary", "from_date", "to_date");
    expect(typeof empInfo.body["titleInfo"]).toBe("object");
    expect(empInfo.body["titleInfo"][0]).toHaveProperty("emp_no", "from_date", "to_date", "title");
  });
});
