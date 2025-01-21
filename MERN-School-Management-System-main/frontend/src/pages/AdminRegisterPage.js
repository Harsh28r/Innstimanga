import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerAdmin } from '../userHandle'; // adjust import path as needed

const AdminRegisterPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    schoolName: '', // Add any other required fields
    role: 'admin'
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.schoolName) newErrors.schoolName = 'School Name is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        console.log('Submitting registration data:', formData);
        const result = await dispatch(registerAdmin(formData));
        console.log('Registration successful:', result);
      } catch (error) {
        console.error('Registration Error:', error.response?.data || error.message);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Password"
        required
      />
      <input
        type="text"
        name="schoolName"
        value={formData.schoolName}
        onChange={handleChange}
        placeholder="School Name"
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default AdminRegisterPage; 