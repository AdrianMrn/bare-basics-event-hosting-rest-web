<?php

use App\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * @var $user User
         */

        $admin = Role::create(['name' => 'admin']);
        $editor = Role::create(['name' => 'editor']);

        $user =  User::create([
            'name' => 'admin',
            'email' => 'adriaanmarain300@gmail.com',
            'password' => bcrypt('admin'),
        ]);

        $user->assignRole('admin');
        $user->assignRole('editor');
    }
}
