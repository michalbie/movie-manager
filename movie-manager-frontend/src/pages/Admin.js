import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
	const [users, setUsers] = useState([]);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const token = localStorage.getItem("token");
				const response = await axios.get("http://127.0.0.1:8000/api/users", {
					headers: { Authorization: `Bearer ${token}` },
				});
				setUsers(response.data);
			} catch (err) {
				console.error(err);
				setError("Failed to fetch users.");
			}
		};
		fetchUsers();
	}, []);

	const handleRoleChange = async (id, role) => {
		try {
			const token = localStorage.getItem("token");
			await axios.put(
				`http://127.0.0.1:8000/api/users/${id}`,
				{ role },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setUsers(users.map((user) => (user.id === id ? { ...user, roles: [{ name: role }] } : user)));
		} catch (err) {
			console.error(err);
			setError("Failed to update user role.");
		}
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this user?")) return;
		try {
			const token = localStorage.getItem("token");
			await axios.delete(`http://127.0.0.1:8000/api/users/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});
			setUsers(users.filter((user) => user.id !== id));
		} catch (err) {
			console.error(err);
			setError("Failed to delete user.");
		}
	};

	return (
		<div className="min-h-screen bg-gray-100 p-4">
			<h1 className="text-2xl font-bold mb-4">Manage Users</h1>
			{error && <p className="text-red-500 mb-4">{error}</p>}
			<table className="w-full bg-white shadow-md rounded-md overflow-hidden">
				<thead className="bg-blue-600 text-white">
					<tr>
						<th className="p-4 text-left">Name</th>
						<th className="p-4 text-left">Email</th>
						<th className="p-4 text-left">Role</th>
						<th className="p-4 text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id} className="border-b">
							<td className="p-4">{user.name}</td>
							<td className="p-4">{user.email}</td>
							<td className="p-4">
								<select
									value={user.roles[0]?.name || ""}
									onChange={(e) => handleRoleChange(user.id, e.target.value)}
									className="p-2 border rounded-md"
								>
									<option value="user">User</option>
									<option value="admin">Admin</option>
								</select>
							</td>
							<td className="p-4 text-center">
								<button onClick={() => handleDelete(user.id)} className="text-red-500 hover:underline">
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Admin;
