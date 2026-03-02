<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Hash;

class SuperAdminSeeder extends Seeder
{
    /**
     * Seed a default superadmin user.
     */
    public function run(): void
    {
        $name = trim((string) env('SUPERADMIN_NAME', 'Jail Officer'));
        $email = strtolower(trim((string) env('SUPERADMIN_EMAIL', 'jailofficer@ppjo.local')));
        $password = (string) env('SUPERADMIN_PASSWORD', 'ChangeMe123!');

        $superAdminRole = Role::firstOrCreate(
            ['name' => 'superadmin'],
            ['label' => 'Super Admin']
        );

        $user = User::updateOrCreate(
            ['email' => $email],
            [
                'name' => $name,
                'password' => Hash::make($password),
                'is_active' => true,
                'email_verified_at' => Carbon::now(),
            ]
        );

        $user->roles()->syncWithoutDetaching([$superAdminRole->id]);
    }
}
