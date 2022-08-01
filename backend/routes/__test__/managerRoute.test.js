const app = require("../../app");
const request = require("supertest");

describe("Testing managers get employee information route", () => {
  test("Test empInfo route with correct employee number", async () => {
    const empInfo = await request(app).get("/managers/getEmployeeDetails").query({ empNo: "11100" }).expect(200);
    expect(typeof empInfo.body).toBe("object");
    expect(empInfo.body["user"]).toBeDefined();
    expect(typeof empInfo.body["user"]).toBe("object");
    expect(empInfo.body["user"]).toHaveProperty("emp_no", "birth_date", "first_name", "last_name", "gender", "hire_date");
    expect(typeof empInfo.body["deptInfo"]).toBe("object");
    expect(empInfo.body["deptInfo"][0]).toHaveProperty("Department", "dept_no", "emp_no", "from_date", "to_date");
    expect(typeof empInfo.body["deptInfo"][0]["Department"]).toBe("object");
    expect(empInfo.body["deptInfo"][0]["Department"]).toHaveProperty("dept_name");
    expect(typeof empInfo.body["salaryInfo"]).toBe("object");
    expect(empInfo.body["salaryInfo"][0]).toHaveProperty("emp_no", "salary", "from_date", "to_date");
    expect(typeof empInfo.body["titleInfo"]).toBe("object");
    expect(empInfo.body["titleInfo"][0]).toHaveProperty("emp_no", "from_date", "to_date", "title");
  });
  test("Test empInfo route with incorrect employeeID", async () => {
    await request(app).get("/managers/getEmployeeDetails")
    .query({ empNo: "1110sda" })
    .expect(500)
    .expect('invalid input syntax for type bigint: "1110sda"');
  });
});
