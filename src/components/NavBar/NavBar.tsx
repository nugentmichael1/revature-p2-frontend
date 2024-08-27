// import React from 'react';
import { Link } from "react-router-dom";
import "./navbar.css";
// import profileIcon from "../../assets/profile3.svg";
// import axios from "axios";

/**
 * Navbar object component for use on the top of all pages
 * @returns the navbar object
 */
function NavBar() {
  return (
    <h1>tmp navbar</h1>
  );
}

/**
 * Navbar link functional component
 *
 * @param {String} props Contains the routing path and the link display text
 * in props.path and props.children, repsectively.
 *
 * @returns The clickable navbar link as a list item tag
 */
// function Navlink(props) {
//   return (
//     <Link to={props.path} className="navbar-link">
//       <FlowbiteNavbar.Link active={props.path === "/home" ? true : false}>
//         {props.children}
//       </FlowbiteNavbar.Link>
//     </Link>
//   );
// }

/**
 * Profile image
 *
 * @returns AI logo as a dropdown menu
 */
// function ProfileIcon() {
//   const { user, setUser } = useUser();

//   const handleLogout = async () => {
//     const token = localStorage.getItem("token");
//     const data = {};
//     const config = {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     };
//     await axios
//       .post("http://localhost:8080/auth/logout", data, config)
//       .catch(function (error) {
//         console.log(error);
//       });
//     setUser(null);
//   };

//   return (
//     <Dropdown
//       arrowIcon={false}
//       inline
//       label={<Avatar alt="User settings" img={profileIcon} rounded />}
//     >
//       <Dropdown.Header>
//         <span className="block text-sm">Welcome,</span>
//         <span className="block truncate text-sm font-medium">
//           {user && user.username}
//         </span>
//       </Dropdown.Header>
//       <Link to="/profile">
//         <Dropdown.Item>Profile</Dropdown.Item>
//       </Link>
//       {/* <Dropdown.Item>Settings</Dropdown.Item> */}
//       <Dropdown.Divider />
//       <Dropdown.Item onClick={handleLogout}>Sign out</Dropdown.Item>
//     </Dropdown>
//   );
// }

export default NavBar;
