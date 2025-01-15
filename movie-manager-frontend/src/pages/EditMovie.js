import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchMovieById, updateMovie } from "../services/api";

const EditMovie = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		title: "",
		genre: "",
		release_year: "",
		director: "",
		banner_url: "",
		stars: "", // Star rating
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const getMovie = async () => {
			try {
				const { data } = await fetchMovieById(id);
				setFormData(data);
			} catch (err) {
				console.error("Error fetching movie:", err);
				setError("Failed to load movie details.");
			}
		};
		getMovie();
	}, [id]);

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess(false);

		try {
			await updateMovie(id, formData);
			setSuccess(true);
			setTimeout(() => {
				navigate("/");
			}, 2000);
		} catch (err) {
			console.error("Error updating movie:", err);
			setError("Failed to update movie. Please try again.");
		}
	};

	if (error) {
		return <p className="text-red-500 text-center mt-4">{error}</p>;
	}

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white shadow-lg rounded-md p-8 w-full max-w-md">
				<h1 className="text-2xl font-bold mb-6">Edit Movie</h1>
				{success && <p className="text-green-500 mb-4">Movie updated successfully! Redirecting...</p>}
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Title</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
							placeholder="Enter movie title"
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
							placeholder="Enter movie genre"
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
							placeholder="Enter release year"
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
							placeholder="Enter director's name"
							required
						/>
					</div>
					<div className="mb-4">
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
					<div className="mb-6">
						<label className="block text-gray-700 mb-2">Stars (1-5)</label>
						<select
							name="stars"
							value={formData.stars}
							onChange={handleChange}
							className="w-full p-2 border border-gray-300 rounded-md"
						>
							<option value="">Select Rating</option>
							<option value="1">1 Star</option>
							<option value="2">2 Stars</option>
							<option value="3">3 Stars</option>
							<option value="4">4 Stars</option>
							<option value="5">5 Stars</option>
						</select>
					</div>
					<button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
						Update Movie
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditMovie;
