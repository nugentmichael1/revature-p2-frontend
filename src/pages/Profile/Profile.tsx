import { Link } from "react-router-dom";
import { useAppContext } from '../../contexts/AppContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import '../../index.css'
import "./Profile.css";

function Profile() {
    const url = import.meta.env.VITE_API_URL;
    const {state: { user },setUser,} = useAppContext();
    const [isEditing, setIsEditing] = useState(false); // State to track if we are in edit mode

    const nav = useNavigate();

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    const handleChange = (e) => {
        // const { name, value } = e.target;
        // setUser({ ...user, [name]: value });
    };

    const handleSave = () => {
        setIsEditing(false);
        // Change to put request when it's updated
        console.log('User information updated:', user);
    };

    // useEffect(() => {
    //     const fetchUserProfile = async () => {
    //         try {
    //             const response = await axios.get(`${url}/user/${user.id}`);
    //             setUser(response.data);
    //             console.log(response.data)
    //         } catch (error) {
    //             console.error('Error fetching user profile:', error);
    //         }
    //     };
    //     fetchUserProfile();
    // }, []);

    // useEffect(() => {
    //     if (user && user.username) {
    //       nav('/');
    //     }
    //   }, [user, nav]);
    
    return (
    <div className="profile-page">
        <h2>Profile</h2>
        {user && (
            <form>
                <div>
                <label>Name:</label>
                <input type="text" name="name" value={user.firstName + " " + user.lastName} onChange={handleChange} readOnly={!isEditing}/>
                </div>
        
                <div>
                <label>Username:</label>
                <input type="text" name="username" value={user.username} onChange={handleChange} readOnly={!isEditing}/>
                </div>
        
                <div>
                <label>Email:</label>
                <input type="email" name="email" value={user.email} onChange={handleChange} readOnly={!isEditing}/>
                </div>
        
                <div>
                <label>Password:</label>
                <input type="password" name="password" value={user.password} onChange={handleChange} readOnly={!isEditing}/>
                </div>
            </form>
        )}

        <button onClick={toggleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
        {isEditing && (
            <button onClick={handleSave}>Save</button>
        )}
    </div>
  );
};

export default Profile;

