   // userHandle.js
   export const registerUser = async (userData, role) => {
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userData, role }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error registering user:', error);
        return { success: false, message: 'Registration failed' };
    }
};