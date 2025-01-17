import axios from 'axios';
import {
    authRequest,
    stuffAdded,
    authSuccess,
    authFailed,
    authError,
    authLogout,
    doneSuccess,
    getDeleteSuccess,
    getRequest,
    getFailed,
    getError,
} from './userSlice';
const REACT_APP_BASE_URL = "http://localhost:5000";

export const loginUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const formattedRole = role.trim().replace(/\s+/g, '');
        const result = await axios.post(`${REACT_APP_BASE_URL}/${formattedRole}Login`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.role) {
            dispatch(authSuccess(result.data));
        } else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError({
            message: error.message,
            code: error.code,
            response: error.response ? error.response.data : null
        }));

        dispatch({
            type: 'user/getError',
            payload: {
                message: error.message,
                name: error.name,
                code: error.code,
                config: error.config,
                request: error.request,
                response: {
                    data: error.response.data,
                    status: error.response.status,
                    headers: error.response.headers,
                },
            }
        });
    }
};

export const registerUser = (fields, role) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${role}Reg`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        }
        else if (result.data.school) {
            dispatch(stuffAdded());
        }
        else {
            dispatch(authFailed(result.data.message));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};

export const getUserDetails = (userId, address) => async (dispatch) => {
    try {
        const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/${address}/${userId}`);
        if (result.data) {
            dispatch({ type: 'user/getDetails', payload: result.data });
        }
    } catch (error) {
        console.error('An error occurred:', error);
        dispatch({ type: 'user/getError', payload: error.message });
    }
};

export const logoutUser = () => (dispatch) => {
    dispatch(authLogout());
};

export const sendOTP = (email) => async (dispatch) => {
    try {
      const response = await axios.post('/api/users/sendOTP', { email });
      console.log(response.data.message);
    } catch (error) {
      console.log(error.response.data.error);
    }
  };
  
  export const verifyOTP = (email, otp) => async (dispatch) => {
    try {
      const response = await axios.post('/api/users/verifyOTP', { email, otp });
      return response.data.isValid;
    } catch (error) {
      console.log(error.response.data.error);
      return false;
    }
  };

export const deleteUser = (id, address) => async (dispatch) => {
    dispatch(getRequest());
    dispatch(getFailed("Sorry the delete function has been disabled for now."));
}

export const updateUser = (fields, id, address) => async (dispatch) => {
    dispatch(getRequest());

    try {
        
        const result = await axios.put(`${process.env.REACT_APP_BASE_URL}/${address}/${id}`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (result.data.schoolName) {
            dispatch(authSuccess(result.data));
        }
        else {
            dispatch(doneSuccess(result.data));
        }
    } catch (error) {
        dispatch(getError(error));
    }
}

export const addStuff = (fields, address) => async (dispatch) => {
    dispatch(authRequest());

    try {
        const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/${address}Create`, fields, {
            headers: { 'Content-Type': 'application/json' },
        });

        if (result.data.message) {
            dispatch(authFailed(result.data.message));
        } else {
            dispatch(stuffAdded(result.data));
        }
    } catch (error) {
        dispatch(authError(error));
    }
};