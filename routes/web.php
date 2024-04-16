<?php

use GuzzleHttp\Promise\Create;
use Illuminate\Support\Facades\Route;
use Spatie\Activitylog\Models\Activity;

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
Route::get('/', 'homeController@index');
//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

//staff, HOD and Provost
Route::group(['middleware' => 'App\Http\Middleware\lecturerHodProvostMiddleware'], function() {
    Route::match(['post','get'], 'application', 'LeaveController@index');
    Route::match(['post','get'], 'editApplication/{id}/', 'LeaveController@edit');

    // return Activity::all();
});

//HOD and Provost

//HOD, Provost, Registry, and VC
Route::group(['middleware' => 'App\Http\Middleware\HodProvostRegistryMiddleware'], function() {
    Route::match(['post','get'], 'applied', 'LeaveController@applied');
    Route::match(['post','get'], 'approval/{id}', 'LeaveController@approval');

    //Leave View Details
    Route::get('leaveViewDetails/{employee_id}/{id}', 'LeaveController@getleaveViewDetails');

    // return Activity::all();
});

//REGISTRY
Route::group(['middleware' => 'App\Http\Middleware\RegistryMiddleware'], function() {
    Route::match(['post','get'],'search', 'signUpsController@show');
    Route::match(['post','get'],'log', 'ActivityLogController@index');
    Route::get('allLeave', 'LeaveController@show');
    Route::get('approved', 'LeaveController@getApprovedLeave');

    //Leave Faculty
    Route::match(['post','get'], 'faculty', 'FacultyController@create');
    Route::match(['post','get'], 'editFaculty/{id}/edit', 'FacultyController@edit');
    Route::match(['post','get'], 'deleteFaculty/{id}/delete', 'FacultyController@destroy');

    //Leave Department
    Route::match(['post','get'], 'department', 'DepartmentController@create');
    Route::match(['post','get'], 'editDepartment/{id}/edit', 'DepartmentController@edit');
    Route::match(['post','get'], 'deleteDepartment/{id}/delete', 'DepartmentController@destroy');

    //Leave Unit
    Route::match(['post','get'], 'unit', 'UnitController@create');
    Route::match(['post','get'], 'editUnit/{id}/edit', 'UnitController@edit');
    Route::match(['post','get'], 'deleteUnit/{id}/delete', 'UnitController@destroy');

    //Leave Type
    Route::match(['post','get'], 'leaveType', 'leaveTypeController@create');
    Route::match(['post','get'], 'editLeaveType/{id}/edit', 'leaveTypeController@edit');
    Route::match(['post','get'], 'leaveType/{id}/delete', 'leaveTypeController@destroy');

    //Holidays
    Route::match(['post','get'], 'holiday', 'HolidayController@index');
    Route::match(['post','get'], 'holiday', 'HolidayController@create');
    Route::match(['post','get'], 'editHoliday/{id}/edit', 'HolidayController@edit');
    Route::match(['post','get'], 'holiday/{id}/delete', 'HolidayController@destroy');

    // return Activity::all();
});

Route::match(['post','get'], 'signUp', 'signUpsController@create');
Route::match(['post','get'], 'application', 'LeaveController@index');

Route::match(['post','get'], 'profile', 'profileController@index');
Route::match(['post','get'], 'profile/{staff_id}', 'profileController@edit');

Route::match(['post','get'], 'editApplication/{id}/', 'LeaveController@edit');
Route::match(['post','get'], 'deleteApplication/{id}/', 'LeaveController@destroy');

// return Activity::all();
