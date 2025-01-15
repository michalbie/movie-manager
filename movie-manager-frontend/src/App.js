import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import AddMovie from "./pages/AddMovie";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import EditMovie from "./pages/EditMovie";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

const App = () => {
	return (
		<>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/admin"
						element={
							<ProtectedRoute>
								<Admin />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/"
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/movie/:id"
						element={
							<ProtectedRoute>
								<MovieDetails />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/add-movie"
						element={
							<ProtectedRoute>
								<AddMovie />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/edit-movie/:id"
						element={
							<ProtectedRoute>
								<EditMovie />
							</ProtectedRoute>
						}
					/>
				</Routes>
			</Router>
		</>
	);
};

export default App;
