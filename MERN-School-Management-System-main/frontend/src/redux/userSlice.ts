import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        currentUser: null,
        currentRole: null,
        managedInstitute: null
    },
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload.user;
            state.currentRole = action.payload.role;
        },
        setManagedInstitute: (state, action) => {
            state.managedInstitute = action.payload;
        },
        clearManagedInstitute: (state) => {
            state.managedInstitute = null;
        }
    }
});

export const { 
    setUser, 
    setManagedInstitute, 
    clearManagedInstitute 
} = userSlice.actions;
export default userSlice.reducer; 