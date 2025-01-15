import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addMovie } from "../services/api";

const AddMovie = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		genre: "",
		release_year: "",
		director: "",
		banner_url: "", // New field
	});

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await addMovie(formData);
			alert("Movie added successfully!");
			navigate("/");
		} catch (error) {
			console.error("Error adding movie:", error);
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white shadow-lg rounded-md p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold mb-6">Add New Movie</h1>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Title</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Genre</label>
						<input
							type="text"
							name="genre"
							value={formData.genre}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Release Year</label>
						<input
							type="number"
							name="release_year"
							value={formData.release_year}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Director</label>
						<input
							type="text"
							name="director"
							value={formData.director}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							required
						/>
					</div>
					<div className="mb-6">
						<label className="block text-gray-700 mb-2">Banner URL</label>
						<input
							type="url"
							name="banner_url"
							value={formData.banner_url}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							placeholder="https://example.com/banner.jpg"
						/>
					</div>
					<button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
						Add Movie
					</button>
				</form>
			</div>
		</div>
	);
};

export default AddMovie;
