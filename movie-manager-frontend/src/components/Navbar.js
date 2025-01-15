import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Navbar = () => {
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	return (
		<nav className="bg-blue-600 text-white p-4">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-2xl font-bold">Movie Manager</h1>
				<div>
					<Link to="/" className="mr-4 hover:underline">
						Home
					</Link>
					<Link to="/add-movie" className="mr-4 hover:underline">
						Add Movie
					</Link>
					<button className="hover:underline" onClick={handleLogout}>
						Logout
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
