import axios from "axios";

const API = axios.create({
	baseURL: "http://127.0.0.1:8000/api", // Replace with your backend URL if different
});

API.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// API Endpoints
export const fetchMovies = () => API.get("/movies");
export const fetchMovieById = (id) => API.get(`/movies/${id}`);
export const addMovie = (movieData) => API.post("/movies", movieData);
export const updateMovie = (id, movieData) => API.put(`/movies/${id}`, movieData);
export const deleteMovie = (id) => API.delete(`/movies/${id}`);
export const registerUser = (userData) => API.post("/register", userData);

export default API;
