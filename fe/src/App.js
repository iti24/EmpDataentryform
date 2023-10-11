import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import SearchBar from './SearchBar';
import SignUp from "./SignUp"
import { Redirect, Route } from 'react-router-dom';

function App() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleSubmit = async(formData) => {
    try {
      const response = await axios.get(`/employees`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
   
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/employees/search?query=${searchQuery}`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const token = localStorage.getItem('token');
  return (
    <>
 
   { token ? (<div className="App"><h1>Employee Management System</h1>
      <EmployeeForm onSubmit={handleSubmit} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} handleSearch={handleSearch} />
      <EmployeeList employees={employees} fetchEmployees={fetchEmployees} />
      
    </div>)
    : <Redirect to="/login" />}
    </>
  );
}

export default App;
