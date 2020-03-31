<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(["prefix" => "api/v1"], function() use($router) {

    $router->post("/testing", "ProjectController@test");
    $router->group(["prefix" => "auth"], function() use($router) {
        $router->post("/register", "AuthController@register");
        $router->post("/login", "AuthController@login");
        $router->get("/me", "AuthController@me");
    });

    $router->group(["prefix" => "projects"], function() use ($router) {
        $router->post("/", "ProjectController@create");
        $router->get("/me", "ProjectController@me");
        $router->get("/individual/{id}", "ProjectController@getProject");
        $router->get("/search", "ProjectController@search");
        $router->patch("/{id}", "ProjectController@update");


        $router->post("/assign/{id}", "ProjectController@assignUser");
        $router->post("/unassign/{id}", "ProjectController@unassignUser");
    });

    $router->group(["prefix" => "comments"], function () use($router) {
        $router->get("/{id}", "CommentsController@index");
        $router->post("/{id}", "CommentsController@create");
        $router->patch("/{id}", "CommentsController@update");
        $router->delete("/{id}", "CommentsController@delete");
    });

    $router->group(["prefix" => "links"], function () use($router) {
        $router->get("/{id}", "LinksController@index");
        $router->post("/{id}", "LinksController@create");
        $router->patch("/{id}", "LinksController@update");
        $router->delete("/{id}", "LinksController@delete");
    });

    $router->group(["prefix" => "time"], function () use ($router) {
        $router->post("/{id}", "TimeLoggedController@add");
        $router->patch("/{id}", "TimeLoggedController@update");
    });

    $router->group(["prefix" => "users"], function () use ($router){
        $router->get("/", "UsersController@index");
        $router->post("/", "UsersController@create");
        $router->patch("/", "UserController@update");
    });

    $router->group(["prefix" => "tasks"], function () use ($router) {
        $router->post("/{id}", "TasksController@create");
        $router->patch("/{id}", "TasksController@update");
        $router->get("/{id}", "TasksController@single");
        $router->delete("/{id}", "TasksController@delete");
    });

    $router->group(["prefix" => "files"], function () use ($router) {
        $router->post("/upload/{id}", "FilesController@upload");
        $router->delete("/remove/{id}", "FilesController@delete");
        $router->get("/{id}", "FilesController@downloadFile");
    });
});
