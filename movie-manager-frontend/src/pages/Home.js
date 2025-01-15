import React, { useEffect, useState } from "react";
import { fetchMovies } from "../services/api";
import { Link } from "react-router-dom";

const Home = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const getMovies = async () => {
			try {
				const { data } = await fetchMovies();
				setMovies(data.data);
			} catch (error) {
				console.error("Error fetching movies:", error);
			}
		};
		getMovies();
	}, []);

	return (
		<div className="min-h-screen bg-gray-100">
			<main className="p-4">
				<h2 className="text-2xl font-semibold mb-4">Movies List</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
					{movies.map((movie) => (
						<Link
							to={`/movie/${movie.id}`}
							key={movie.id}
							className="bg-white shadow-md rounded-md overflow-hidden hover:shadow-lg transition"
						>
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
							</div>
						</Link>
					))}
				</div>
			</main>
		</div>
	);
};

export default Home;
