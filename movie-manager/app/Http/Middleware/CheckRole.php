<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    public function handle(Request $request, Closure $next, $role)
    {
        \Log::info('CheckRole middleware triggered', [
            'user_id' => auth()->id(),
            'user_role' => optional(auth()->user())->role,
            'required_role' => $role,
        ]);

        if (!auth()->check()) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        if (auth()->user()->role !== $role) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return $next($request);
    }

}