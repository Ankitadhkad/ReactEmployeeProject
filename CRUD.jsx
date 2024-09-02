import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import './CRUD.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";

const CRUD = () => {
    const navigate = useNavigate();
    const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const genderOptions = ['Male', 'Female', 'Other'];
    const [data, setData] = useState([]);

    const [FullName, setFullName] = useState('');
    const [Mobile, setMobile] = useState('');
    const [Email, setEmail] = useState('');
    const [Age, setAge] = useState('');
    const [Bloodgroup, setBloodgroup] = useState('');
    const [Address, setAddress] = useState('');
    const [Gender, setGender] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        validateForm();
    }, [FullName, Mobile, Email, Age, Bloodgroup, Address, Gender]);

    const getData = async () => {
        try {
            const result = await axios.get('http://localhost:5285/api/StudentD');
            setData(result.data);
        } catch (error) {
            console.error("There was an error fetching the data!", error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isFormValid) return;

        axios.post('http://localhost:5285/api/StudentD', {
            FullName, Mobile, Email, Age, Bloodgroup, Address, Gender,
        })
            .then(() => {
                getData();
                resetForm();
            })
            .catch((error) => {
                console.error('There was an error submitting!', error);
            });
    };

   
    const validateForm = () => {
        const isValid =
            FullName.trim() !== '' &&
            /^[0-9]+$/.test(Mobile) &&
            Email.trim() !== '' &&
            Age.trim() !== '' &&
            Bloodgroup.trim() !== '' &&
            Address.trim() !== '' &&
            Gender.trim() !== '';
        setIsFormValid(isValid);
    };

  
    const resetForm = () => {
        setFullName('');
        setMobile('');
        setEmail('');
        setAge('');
        setBloodgroup('');
        setAddress('');
        setGender('');
    };

    const handleCancel = () => {
        resetForm();
        navigate('/');
    };

   
    const handleMobileChange = (e) => {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value)) {
            setMobile(value);
        }
    };

    return (
        <Container>
            <Row>
                <Col>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        value={FullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </Col>
                <Col>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Mobile"
                        value={Mobile}
                        onChange={handleMobileChange}
                        required
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                        value={Email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Col>
                <Col>
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Enter Age"
                        value={Age}
                        onChange={(e) => setAge(e.target.value)}
                        required
                    />
                </Col>
                <Col>
                    <select
                        className="form-control"
                        value={Bloodgroup}
                        onChange={(e) => setBloodgroup(e.target.value)}
                        required
                    >
                        <option value="">Select Blood Group</option>
                        {bloodGroupOptions.map(group => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Address"
                        value={Address}
                        onChange={(e) => setAddress(e.target.value)}
                        required
                    />
                </Col>
                <Col>
                    <div>
                        {genderOptions.map(option => (
                            <div key={option}>
                                <input
                                    type="radio"
                                    name="gender"
                                    value={option}
                                    checked={Gender === option}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                />
                                {option}
                            </div>
                        ))}
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        className="btn btn-primary"
                        onClick={handleSubmit}
                        disabled={!isFormValid} 
                    >
                        Submit
                    </Button>
                    <Button
                        className="btn btn-danger"
                        onClick={handleCancel}
                    >
                        Cancel
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default CRUD;
