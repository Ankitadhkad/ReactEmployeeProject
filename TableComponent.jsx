// TableComponent.js
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TableComponent.css";

const TableComponent = () => {
    const [showEdit, setShowEdit] = useState(false);
    const [data, setData] = useState([]);
    const [editData, setEditData] = useState({
        id: "",
        fullName: "",
        mobile: "",
        email: "",
        age: "",
        bloodgroup: "",
        address: "",
        gender: "",
    });
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get("http://localhost:5285/api/StudentD");
            setData(result.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleEditClose = () => setShowEdit(false);

    const handleEditShow = (employee) => {
        setEditData(employee);
        setShowEdit(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveChanges = async () => {
        try {
            await axios.put(`http://localhost:5285/api/StudentD/${editData.id}`, editData);
            fetchData();
            handleEditClose();
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this record?")) {
            try {
                await axios.delete(`http://localhost:5285/api/StudentD/${id}`);
                fetchData();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    };

    return (
        <div className="container">
            <>
                <Button className="btn btn-success mb-3" onClick={() => navigate("/add-employee")}>
                    Add Employee
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Full Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Age</th>
                            <th>Blood Group</th>
                            <th>Address</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.fullName}</td>
                                <td>{employee.mobile}</td>
                                <td>{employee.email}</td>
                                <td>{employee.age}</td>
                                <td>{employee.bloodgroup}</td>
                                <td>{employee.address}</td>
                                <td>{employee.gender}</td>
                                <td>
                                    <Button
                                        onClick={() => handleEditShow(employee)}
                                        className="btn btn-primary"
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(employee.id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>

                {/* Edit Modal */}
                <Modal show={showEdit} onHide={handleEditClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modify / Update Employee</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    value={editData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Mobile</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="mobile"
                                    value={editData.mobile}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    name="email"
                                    value={editData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Age</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    name="age"
                                    value={editData.age}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Blood Group</label>
                                <select
                                    className="form-control"
                                    name="bloodgroup"
                                    value={editData.bloodgroup}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Select Blood Group
                                    </option>
                                    <option value="A+">A+</option>
                                    <option value="A-">A-</option>
                                    <option value="B+">B+</option>
                                    <option value="B-">B-</option>
                                    <option value="AB+">AB+</option>
                                    <option value="AB-">AB-</option>
                                    <option value="O+">O+</option>
                                    <option value="O-">O-</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="address"
                                    value={editData.address}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Gender</label>
                                <div>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={editData.gender === "Male"}
                                        onChange={handleChange}
                                        required
                                    />
                                    Male
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={editData.gender === "Female"}
                                        onChange={handleChange}
                                        required
                                    />
                                    Female
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Other"
                                        checked={editData.gender === "Other"}
                                        onChange={handleChange}
                                        required
                                    />
                                    Other
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleEditClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleSaveChanges}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    );
};

export default TableComponent;
