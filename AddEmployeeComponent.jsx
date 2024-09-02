import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AddEmployeeComponent.css";

const AddEmployeeComponent = () => {
    const navigate = useNavigate();
    const [newEmployee, setNewEmployee] = useState({
        fullName: "",
        mobile: "",
        email: "",
        age: "",
        bloodgroup: "",
        address: "",
        gender: "",
    });
    const [errors, setErrors] = useState({});

    const handleNewChange = (e) => {
        const { name, value } = e.target;
        setNewEmployee((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validate = () => {
        let tempErrors = {};
        if (!newEmployee.fullName) tempErrors.fullName = "Full Name is required";
        if (!newEmployee.mobile || !/^\d+$/.test(newEmployee.mobile)) tempErrors.mobile = "Mobile number is required and should be numeric";
        if (!newEmployee.email) tempErrors.email = "Email is required";
        if (!newEmployee.age || isNaN(newEmployee.age)) tempErrors.age = "Age is required and should be numeric";
        if (!newEmployee.bloodgroup) tempErrors.bloodgroup = "Blood Group is required";
        if (!newEmployee.address) tempErrors.address = "Address is required";
        if (!newEmployee.gender) tempErrors.gender = "Gender is required";
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleAddNewEmployee = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        try {
            await axios.post("http://localhost:5285/api/StudentD", newEmployee);
            navigate("/"); // Navigate back to the table component on successful addition
        } catch (error) {
            console.error("Error adding new employee:", error);
        }
    };

    const handleCancel = () => {
        navigate("/"); // Navigate back without saving
    };

    return (
        <div className="container">
        <div className="container mr-10 d-flex justify-content-center">
            <div className="w-200">
                <h2>Add New Employee</h2>
                <form onSubmit={handleAddNewEmployee}>
                    <div className="form-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="fullName"
                            value={newEmployee.fullName}
                            onChange={handleNewChange}
                        />
                        {errors.fullName && <small className="text-danger">{errors.fullName}</small>}
                    </div>
                    <div className="form-group">
                        <label>Mobile</label>
                        <input
                            type="tel"
                            className="form-control"
                            name="mobile"
                            value={newEmployee.mobile}
                            onChange={handleNewChange}
                            pattern="\d*"
                            maxLength="10"
                        />
                        {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={newEmployee.email}
                            onChange={handleNewChange}
                        />
                        {errors.email && <small className="text-danger">{errors.email}</small>}
                    </div>
                    <div className="form-group">
                        <label>Age</label>
                        <input
                            type="number"
                            className="form-control"
                            name="age"
                            value={newEmployee.age}
                            onChange={handleNewChange}
                        />
                        {errors.age && <small className="text-danger">{errors.age}</small>}
                    </div>
                    <div className="form-group">
                        <label>Blood Group</label>
                        <select
                            className="form-control"
                            name="bloodgroup"
                            value={newEmployee.bloodgroup}
                            onChange={handleNewChange}
                        >
                            <option value="" disabled>Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>
                        {errors.bloodgroup && <small className="text-danger">{errors.bloodgroup}</small>}
                    </div>
                    <div className="form-group">
                        <label>Address</label>
                        <input
                            type="text"
                            className="form-control"
                            name="address"
                            value={newEmployee.address}
                            onChange={handleNewChange}
                        />
                        {errors.address && <small className="text-danger">{errors.address}</small>}
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <div>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={newEmployee.gender === "Male"}
                                onChange={handleNewChange}
                            />
                            Male
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={newEmployee.gender === "Female"}
                                onChange={handleNewChange}
                            />
                            Female
                            <input
                                type="radio"
                                name="gender"
                                value="Other"
                                checked={newEmployee.gender === "Other"}
                                onChange={handleNewChange}
                            />
                            Other
                        </div>
                        {errors.gender && <small className="text-danger">{errors.gender}</small>}
                    </div>
                    <div className="mt-4">
                        <Button type="submit" variant="primary" className="me-2">
                            Add Employee
                        </Button>
                        <Button type="button" variant="secondary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </div>
            </div>
        </div>
    );
};

export default AddEmployeeComponent;
