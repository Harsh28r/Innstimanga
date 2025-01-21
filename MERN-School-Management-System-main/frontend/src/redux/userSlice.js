import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    currentUser: null,
    currentRole: null,
    managedInstituteId: null,
    loading: false,
    error: {
      message: null,
      status: null,
      code: null,
      details: null
    }
  },
  reducers: {
    authRequest: (state) => {
      state.loading = true;
      state.error = {
        message: null,
        status: null,
        code: null,
        details: null
      };
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.currentRole = action.payload.role;
      state.error = {
        message: null,
        status: null,
        code: null,
        details: null
      };
    },
    authError: (state, action) => {
      state.loading = false;
      state.error = {
        message: action.payload.message || 'An error occurred',
        status: action.payload.status || null,
        code: action.payload.code || null,
        details: action.payload.details || null
      };
    },
    logout: (state) => {
      state.currentUser = null;
      state.currentRole = null;
      state.error = {
        message: null,
        status: null,
        code: null,
        details: null
      };
    },
    setManagedInstitute: (state, action) => {
      state.managedInstituteId = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const { 
  authRequest, 
  authSuccess, 
  authError, 
  logout, 
  setManagedInstitute, 
  setLoading 
} = userSlice.actions;
export default userSlice.reducer; 