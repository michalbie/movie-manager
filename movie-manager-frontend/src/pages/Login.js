import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://127.0.0.1:8000/api/login", {
				email,
				password,
			});

			// Save the token to localStorage
			localStorage.setItem("token", response.data.token);

			// Navigate to the home page
			navigate("/");
		} catch (err) {
			console.error(err);
			setError("Invalid email or password");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white shadow-lg rounded-md p-8 w-96">
				<h1 className="text-2xl font-bold mb-6">Login</h1>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<form onSubmit={handleLogin}>
					<input
						type="email"
						placeholder="Email"
						className="w-full p-2 border border-gray-300 rounded-md mb-4"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						type="password"
						placeholder="Password"
						className="w-full p-2 border border-gray-300 rounded-md mb-4"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
