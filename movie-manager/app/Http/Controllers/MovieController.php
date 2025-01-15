<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    public function index()
    {
        $movies = Movie::where('user_id', auth()->id())->get();
        return response()->json($movies);
    }


    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'release_year' => 'required|integer',
            'director' => 'required|string|max:255',
            'banner_url' => 'nullable|url',
            'stars' => 'nullable|integer|min:1|max:5',
        ]);

        $movie = Movie::create([
            'title' => $request->title,
            'genre' => $request->genre,
            'release_year' => $request->release_year,
            'director' => $request->director,
            'banner_url' => $request->banner_url,
            'stars' => $request->stars,
            'user_id' => auth()->id(), // Automatically assign the logged-in user's ID
        ]);

        return response()->json($movie, 201);
    }



    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'genre' => 'required|string|max:255',
            'release_year' => 'required|integer',
            'director' => 'required|string|max:255',
            'banner_url' => 'nullable|url',
            'stars' => 'nullable|integer|min:1|max:5',
        ]);

        $movie = Movie::findOrFail($id);
        $movie->update($request->all());

        return response()->json($movie);
    }


    public function show($id)
    {
        return response()->json(Movie::find($id));
    }

    public function destroy($id)
    {
        Movie::destroy($id);
        return response()->json(['message' => 'Movie deleted']);
    }
}
