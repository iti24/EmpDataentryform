import React, { useState, useEffect } from 'react';
import axios from 'axios';
import axiosInstance from './axiosInstance';

function EmployeeManagement() {
  const [employeeData, setEmployeeData] = useState({
    empid: '',
    name: '',
    designation: '',
    address: '',
    phoneNo: '',
    email: '',
    gender: 'male',
  });

  const [employees, setEmployees] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axiosInstance.get('/employees'); // Adjust the API route as needed
      console.log(response)
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (editingId) {
        // If editing an employee
        await axiosInstance.put(`/employees/${editingId}`, employeeData);
        setEditingId(null); // Reset editing ID
      } else {
        // If adding a new employee
        await axiosInstance.post('/employees', employeeData);
      }
      setEmployeeData({
        empid: '',
        name: '',
        designation: '',
        address: '',
        phoneNo: '',
        email: '',
        gender: 'male',
      });
      fetchEmployees(); // Refresh employee list
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleEdit = async (employeeId) => {
    try {
      const response = await axiosInstance.get(`/employees/${employeeId}`);
      const employee = response.data;
      setEmployeeData(employee);
      setEditingId(employeeId);
    } catch (error) {
      console.error('Error fetching employee for editing:', error);
    }
  };

  const handleDelete = async (employeeId) => {
    try {
      await axiosInstance.delete(`/employees/${employeeId}`);
      fetchEmployees(); // Refresh employee list after deletion
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  return (
    <div>
      {/* Your form JSX here */}
      <form onSubmit={handleSubmit}>
        {/* Input fields for employee data */}
        {/* ... */}
        <button type="submit">Save</button>
      </form>

      {/* Employee list */}
      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {employee.name}
            <button onClick={() => handleEdit(employee._id)}>Edit</button>
            <button onClick={() => handleDelete(employee._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeManagement;
