// Example action creator
export const loginUser = (credentials) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
        dispatch({ type: 'user/loginSuccess', payload: response.data });
    } catch (error) {
        dispatch({ type: 'user/getError', payload: error.message }); // Ensure payload is serializable
    }
};