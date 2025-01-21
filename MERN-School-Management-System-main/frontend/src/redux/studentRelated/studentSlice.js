import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    studentsList: [],
    loading: false,
    error: null,
    response: null,
    statestatus: "idle",
    studentData: null,
    status: 'idle',
};

export const getAllStudents = createAsyncThunk(
    'student/getAllStudents',
    async (adminID, { rejectWithValue }) => {
        try {
            if (!adminID) {
                return rejectWithValue('No admin ID provided');
            }
            const response = await axios.get(`http://localhost:5000/Students/${adminID}`);
            return response.data;
        } catch (error) {
            return rejectWithValue({
                message: error.message,
                status: error.response?.status
            });
        }
    }
);

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        getRequest: (state) => {
            state.loading = true;
        },
        stuffDone: (state) => {
            state.loading = false;
            state.error = null;
            state.response = null;
            state.statestatus = "added";
        },
        getSuccess: (state, action) => {
            state.studentsList = action.payload;
            state.loading = false;
            state.error = null;
            state.response = null;
        },
        getFailed: (state, action) => {
            state.response = action.payload;
            state.loading = false;
            state.error = null;
        },
        getError: (state, action) => {
            state.status = 'error';
            state.error = action.payload;
        },
        underStudentControl: (state) => {
            state.loading = false;
            state.response = null;
            state.error = null;
            state.statestatus = "idle";
        },
        setStudentData: (state, action) => {
            state.studentData = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllStudents.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllStudents.fulfilled, (state, action) => {
                state.loading = false;
                state.studentsList = action.payload;
                state.error = null;
            })
            .addCase(getAllStudents.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const {
    getRequest,
    getSuccess,
    getFailed,
    getError,
    underStudentControl,
    stuffDone,
    setStudentData,
} = studentSlice.actions;

export const studentReducer = studentSlice.reducer;