<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    // View all users
    public function index()
    {
        $users = User::with('roles')->get();

        return response()->json($users);
    }

   public function update(Request $request, $id)
    {
        $request->validate([
            'role' => 'required|string|in:admin,user',
        ]);

        $user = User::findOrFail($id);

        // Remove existing roles and assign the new one
        $user->syncRoles([$request->role]);

        return response()->json(['message' => 'User role updated successfully']);
    }

    // Delete a user
    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}
