import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuperAdminLoginForm = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple frontend-only validation
    if (username === "test" && password === "test1") {
      // Directly navigate to /super path on successful login
      navigate('/super');
    } else {
      // Optional: Add error handling
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000
    }}>
      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '12px',
        width: '350px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        textAlign: 'center'
      }}>
        <h2 style={{
          marginBottom: '20px', 
          color: '#333', 
          fontWeight: '600'
        }}>Super Admin Login</h2>
        <div style={{marginBottom: '15px'}}>
          <label style={{
            display: 'block', 
            marginBottom: '5px', 
            textAlign: 'left', 
            color: '#555'
          }}>Username:</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              outline: 'none',
              fontSize: '16px'
            }}
          />
        </div>
        <div style={{marginBottom: '20px'}}>
          <label style={{
            display: 'block', 
            marginBottom: '5px', 
            textAlign: 'left', 
            color: '#555'
          }}>Password:</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ddd',
              outline: 'none',
              fontSize: '16px'
            }}
          />
        </div>
        <div style={{
          display: 'flex', 
          justifyContent: 'space-between', 
          gap: '10px'
        }}>
          <button 
            type="submit" 
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#45a049'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#4CAF50'}
          >
            Login
          </button>
          <button 
            type="button" 
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'background-color 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#d32f2f'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#f44336'}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SuperAdminLoginForm;