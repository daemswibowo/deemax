<?php

use Illuminate\Database\Seeder;
use App\User;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superadmin = User::create(['name'=>'Super Admin','email'=>'super@min.com','password'=>bcrypt('sooper@min.com')]);

		$role_superadmin = Role::create(['name' => 'Super Admin']);
		$perm_role = Permission::create(['name' => 'Manage Role']);
		$perm_permission = Permission::create(['name' => 'Manage Permission']);

		$role_superadmin->givePermissionTo(['Manage Role','Manage Permission']);

		$superadmin->assignRole('Super Admin');
    }
}
