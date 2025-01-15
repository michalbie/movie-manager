import React, { useEffect, useState } from "react";
import { fetchMovies, deleteMovie } from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const getMovies = async () => {
			try {
				const { data } = await fetchMovies();
				setMovies(data); // Assuming the backend returns only the logged-in user's movies
			} catch (err) {
				console.error("Error fetching movies:", err);
				setError("Failed to load movies.");
			}
		};
		getMovies();
	}, []);

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this movie?")) {
			return;
		}

		try {
			await deleteMovie(id);
			setMovies(movies.filter((movie) => movie.id !== id)); // Remove the deleted movie from the list
		} catch (error) {
			console.error("Error deleting movie:", error);
			setError("Failed to delete movie. Please try again.");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100">
			<main className="p-4">
				<h2 className="text-2xl font-semibold mb-4">Movies List</h2>
				{error && <p className="text-red-500 mb-4">{error}</p>}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{movies.map((movie) => (
						<div key={movie.id} className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition">
							<img
								src={
									movie.banner_url ||
									"https://img.freepik.com/free-psd/burn-paper-text-effect_47987-18105.jpg?t=st=1736961362~exp=1736964962~hmac=0d93ad70507090cfaef5e988346514d725fc2fc2eac62ea993e1c1ad22e67958&w=740"
								}
								alt={`${movie.title} banner`}
								className="w-full h-48 object-cover"
							/>
							<div className="p-4">
								<h3 className="text-xl font-bold">{movie.title}</h3>
								<p className="text-gray-700">Genre: {movie.genre}</p>
								<p className="text-gray-700">Director: {movie.director}</p>
								<p className="text-gray-700">Year: {movie.release_year}</p>
								<p className="text-yellow-500">
									Stars: {"★".repeat(movie.stars || 0)}{" "}
									<span className="text-gray-500">
										{5 - (movie.stars || 0) > 0 ? "☆".repeat(5 - (movie.stars || 0)) : ""}
									</span>
								</p>
								<div className="flex mt-4">
									<Link to={`/edit-movie/${movie.id}`} className="text-blue-500 hover:underline mr-4">
										Edit
									</Link>
									<button onClick={() => handleDelete(movie.id)} className="text-red-500 hover:underline">
										Delete
									</button>
								</div>
							</div>
						</div>
					))}
				</div>
			</main>
		</div>
	);
};

export default Home;
