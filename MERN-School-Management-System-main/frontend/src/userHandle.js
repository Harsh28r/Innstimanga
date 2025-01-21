import axios from 'axios';
import { authRequest, authSuccess, authError } from './redux/userSlice';

// Create an axios instance with detailed configuration
const api = axios.create({
  baseURL: 'http://localhost:5000',
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Request interceptor for logging
api.interceptors.request.use(
  config => {
    console.log('Axios Request Config:', {
      method: config.method,
      url: config.url,
      data: config.data
    });
    return config;
  },
  error => {
    console.error('Axios Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  response => {
    console.log('Axios Response:', response.data);
    return response;
  },
  error => {
    console.error('Axios Full Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      headers: error.response?.headers
    });
    return Promise.reject(error);
  }
);

// Comprehensive error extraction function
const extractErrorInfo = (error) => {
  // Completely flatten and serialize error information
  return {
    message: error.response?.data?.message 
      || error.message 
      || 'An unexpected error occurred',
    status: error.response?.status || null,
    code: error.code || 'UNKNOWN_ERROR',
    details: error.response?.data 
      ? JSON.stringify(error.response.data) 
      : null,
    // Add any additional serializable error context
    timestamp: new Date().toISOString()
  };
};

export const registerAdmin = (adminData) => async (dispatch) => {
  try {
    dispatch(authRequest());
    
    const response = await api.post('/AdminReg', adminData);
    
    dispatch(authSuccess({ 
      user: response.data.user, 
      role: response.data.role 
    }));

    return response.data;
  } catch (error) {
    // Log full error for debugging
    console.error('Full Registration Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    // Dispatch only completely serializable error information
    const serializedError = extractErrorInfo(error);
    dispatch(authError(serializedError));
    
    // Throw a new error with serializable information
    throw new Error(serializedError.message);
  }
}; 