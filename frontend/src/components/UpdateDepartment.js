import styles from "../styles/UpdateRole.module.css";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import { TextField, MenuItem } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";

function UpdateDepartment() {
  const { setUpdateDepartment, employeeDepInfo, setEmployeeDepInfo, loginInfo } = useContext(AppContext);

  const [newDepartment, setNewDepartment] = useState(employeeDepInfo.deptInfo[0].dept_no);
  const [newDepartmentStartDate, setNewDepartmentStartDate] = useState("");

  const handleNewDepartment = (e) => {
    setNewDepartment(e.target.value);
  };

  const handleNewDepartmentStartDate = (e) => {
    setNewDepartmentStartDate(e.target.value);
  };

  const cancelUpdateDepartment = () => {
    setUpdateDepartment(false);
  };

  const handleDepartmentUpdate = async (ev) => {
    try {
      ev.preventDefault();
      const editEmployee = await axios.put("/hrManagers/editEmployeeDepartment", {
        empNum: employeeDepInfo.user.emp_no,
        newDepartmentNo: newDepartment,
        newDepartmentStartDate: newDepartmentStartDate,
      });
      swal({
        title: "Success!",
        text: `${editEmployee.data.message}`,
        icon: "success",
        button: "continue!",
      });
      const newEmployeeInfo = { ...employeeDepInfo };
      newEmployeeInfo.deptInfo[0].to_date = newDepartmentStartDate;
      const departmentName = loginInfo.departmentList.filter((departments) => departments.dept_no === newDepartment);
      newEmployeeInfo.deptInfo.unshift({
        Department: { dept_name: departmentName[0].dept_name },
        emp_no: employeeDepInfo.user.emp_no,
        dept_no: newDepartment,
        from_date: newDepartmentStartDate,
        to_date: "9999-01-01",
      });
      setEmployeeDepInfo(newEmployeeInfo);
      setUpdateDepartment(false);
    } catch (e) {
      swal({
        title: "Edit Employee Failed!",
        text: `${e.response.data.message}`,
        icon: "error",
        button: "okay",
      });
      console.log(e);
    }
  };

  return (
    <div>
      <div className={styles.headerWrapper}>
        <h2 className={styles.header}>Department History</h2>
        <div onClick={cancelUpdateDepartment} className={styles.hrLink}>
          Cancel
        </div>
      </div>
      <form onSubmit={handleDepartmentUpdate}>
        <div className={styles.formWrapper}>
          <div className={styles.formColumn}>
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.deptInfo[0].Department.dept_name}
              sx={{ margin: "20px" }}
              label="Current Department"
            />
            <TextField
              size="small"
              required
              type="text"
              disabled={true}
              value={employeeDepInfo.deptInfo[0].from_date}
              sx={{ margin: "20px" }}
              label="Current Role Start Date"
            />
          </div>
          <div className={styles.formColumn}>
            <TextField
              select
              size="small"
              required
              sx={{ margin: "20px" }}
              value={newDepartment}
              label="New Department"
              onChange={handleNewDepartment}
            >
              {loginInfo.deptWithManagersList.map((department, index) => {
                return (
                  <MenuItem key={index} value={department["Departments.dept_no"]}>
                    {department["Departments.dept_name"]}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              size="small"
              required
              type="text"
              value={newDepartmentStartDate}
              onChange={handleNewDepartmentStartDate}
              sx={{ margin: "20px" }}
              label="New Department Start Date"
            />
          </div>
        </div>
        <input className={styles.hrLink} value={"Update Department"} type="submit" />
      </form>
    </div>
  );
}

export default UpdateDepartment;
