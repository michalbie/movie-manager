<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class AssignRolesSeeder extends Seeder
{
    public function run()
    {
        // Assign roles based on old logic or manually
        $adminUser = User::where('email', 'admin@example.com')->first();
        if ($adminUser) {
            $adminUser->assignRole('admin');
        }

        // Assign 'user' role to all other users
        $regularUsers = User::where('email', '!=', 'admin@example.com')->get();
        foreach ($regularUsers as $user) {
            $user->assignRole('user');
        }
    }
}
