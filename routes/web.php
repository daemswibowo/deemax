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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

if ( ! request()->ajax() ) {
Route::get('/dashboard/{vue?}', 'DashboardController@index')->where('vue', '[\/\w\.-]*')->middleware('auth');
}
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
