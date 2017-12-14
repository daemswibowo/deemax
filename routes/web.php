<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
use Illuminate\Http\Request;

Route::get('/', function () {
	return view('welcome');
});

Auth::routes();

Route::middleware(['auth'])->prefix('dashboard/api')->group(function () {
	Route::get('user.json', function (Request $request) {
		$user = $request->user();
		$user->getPermissionsViaRoles();
		return $user;
	});
	Route::prefix('management')->group(function () {
		Route::resource('permission', 'Api\\PermissionController', ['except'=>['create','edit']]);
		Route::resource('role', 'Api\\RoleController', ['except'=>['create','edit']]);
	});
});

if ( ! request()->ajax() ) {
	Route::get('/dashboard/{vue?}', 'DashboardController@index')->where('vue', '[\/\w\.-]*')->middleware('auth');
}

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

