import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password_confirmation: "",
	});

	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		try {
			await registerUser(formData);
			setSuccess(true);
			setTimeout(() => {
				navigate("/login");
			}, 2000); // Redirect to login after success
		} catch (err) {
			console.error("Error registering user:", err);
			setError("Failed to register. Please try again.");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white shadow-lg rounded-md p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold mb-6">Register</h1>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				{success && <p className="text-green-500 mb-4">Registration successful! Redirecting to login...</p>}
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Name</label>
						<input
							type="text"
							name="name"
							value={formData.name}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							placeholder="Enter your name"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Email</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							placeholder="Enter your email"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Password</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							placeholder="Enter your password"
							required
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 mb-2">Confirm Password</label>
						<input
							type="password"
							name="password_confirmation"
							value={formData.password_confirmation}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							placeholder="Confirm your password"
							required
						/>
					</div>
					<button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
						Register
					</button>
				</form>
			</div>
		</div>
	);
};

export default Register;
