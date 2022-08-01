import styles from "../styles/AddEmployee.module.css";
import { useContext, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import swal from "sweetalert";
import AddAndEditEmployeeForm from "./AddAndEditEmployeeForm";

function AddEmployee() {
  const { setAddEmployee, loginInfo, setPaginationCountEmployee, setPaginationEmployeeArray } = useContext(AppContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [birthDate, setBirthDate] = useState("2000-01-01");
  const [empNum, setEmpNum] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [hireDate, setHireDate] = useState("2022-01-01");
  const [salary, setSalary] = useState("");

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
  };

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  const handleBirthDate = (e) => {
    setBirthDate(e.target.value);
  };

  const handleEmpNum = (e) => {
    setEmpNum(e.target.value);
  };

  const handleRole = (e) => {
    setRole(e.target.value);
  };

  const handleDepartment = (e) => {
    setDepartment(e.target.value);
  };

  const handleHireDate = (e) => {
    setHireDate(e.target.value);
  };

  const handleSalary = (e) => {
    setSalary(e.target.value);
  };

  const toggleAddEmployee = () => {
    setAddEmployee(false);
  };

  const addEmployee = async (ev) => {
    try {
      ev.preventDefault();
      const addNewEmployee = await axios.post("/hrManagers/addEmployee", {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        birthDate: birthDate,
        empNum: empNum,
        role: role,
        department: department,
        hireDate: hireDate,
        salary: salary
      });
      const newEmployee = {
        Titles: [{ title: role, to_date: "9999-01-01" }],
        first_name: firstName,
        last_name: lastName,
        emp_no: empNum,
        hire_date: hireDate,
      };
      const newColleaguesArray = [...loginInfo.colleagues];
      newColleaguesArray.unshift(newEmployee);
      setPaginationCountEmployee(Math.ceil(newColleaguesArray.length / 10));
      setPaginationEmployeeArray(newColleaguesArray.slice(0, 10));
      setFirstName("");
      setLastName("");
      setGender("");
      setBirthDate("");
      setDepartment("");
      setEmpNum("");
      setRole("");
      setHireDate("");
      setSalary("")
      swal({
        title: "Success!",
        text: `${addNewEmployee.data.message}`,
        icon: "success",
        button: "continue!",
      });
    } catch (e) {
      swal({
        title: "Add Employee Failed!",
        text: `${e.response.data.message}`,
        icon: "error",
        button: "okay",
      });
      console.log(e);
    }
  };

  return (
    <div>
      <div onClick={toggleAddEmployee} className={styles.hrLink}>
        Cancel
      </div>
      <h1>Employee Information</h1>
      <AddAndEditEmployeeForm
        handleSubmit={addEmployee}
        firstName={firstName}
        lastName={lastName}
        gender={gender}
        birthDate={birthDate}
        empNum={empNum}
        role={role}
        department={department}
        hireDate={hireDate}
        salary={salary}
        handleFirstName={handleFirstName}
        handleLastName={handleLastName}
        handleGender={handleGender}
        handleBirthDate={handleBirthDate}
        handleEmpNum={handleEmpNum}
        handleRole={handleRole}
        handleDepartment={handleDepartment}
        handleHireDate={handleHireDate}
        handleSalary={handleSalary}
        addEmployee={true}
      />
    </div>
  );
}

export default AddEmployee;
