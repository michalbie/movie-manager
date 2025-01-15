import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../services/api";

const MovieDetails = () => {
	const { id } = useParams();
	const [movie, setMovie] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const getMovieDetails = async () => {
			try {
				const { data } = await fetchMovieById(id);
				setMovie(data);
			} catch (error) {
				console.error("Error fetching movie details:", error);
				setError("Unable to fetch movie details.");
			}
		};
		getMovieDetails();
	}, [id]);

	if (error) {
		return <p className="text-red-500 text-center mt-4">{error}</p>;
	}

	if (!movie) {
		return <p className="text-center mt-4">Loading movie details...</p>;
	}

	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="bg-white shadow-lg rounded-md p-8 w-full max-w-lg">
				<h1 className="text-3xl font-bold mb-6">{movie.title}</h1>
				<p className="text-gray-700 mb-4">
					<strong>Genre:</strong> {movie.genre}
				</p>
				<p className="text-gray-700 mb-4">
					<strong>Director:</strong> {movie.director}
				</p>
				<p className="text-gray-700 mb-4">
					<strong>Release Year:</strong> {movie.release_year}
				</p>
				<button
					onClick={() => window.history.back()}
					className="bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
				>
					Back to List
				</button>
			</div>
		</div>
	);
};

export default MovieDetails;
