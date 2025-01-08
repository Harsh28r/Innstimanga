import { useSelector } from 'react-redux';

const AdminProfile = () => {
    const { currentUser } = useSelector((state) => state.user);

    if (!currentUser || !currentUser.name) {
        return <div>Loading...</div>;
    }

    const { name, email, schoolName } = currentUser;

    return (
        <div>
            Name: {name}
            <br />
            Email: {email}
            <br />
            School: {schoolName}
        </div>
    );
}

export default AdminProfile
