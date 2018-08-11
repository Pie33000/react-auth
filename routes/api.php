<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Authentification route
Route::post('login','Authent@signIn');  
Route::post('register','Authent@signUp');  
Route::post('password/email','Auth\ForgotPasswordController@sendResetLinkEmail'); 
Route::post('password/reset','Auth\ResetPasswordController@reset');


    

       
//Article route
Route::post('articles', 'ArticleController@store');
Route::get('articles', 'ArticleController@index');
Route::get('articles/{id}', 'ArticleController@show');
Route::get('checkuser', 'ArticleController@checkUser');

