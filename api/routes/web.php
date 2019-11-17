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
    $router->group(["prefix" => "auth"], function() use($router) {
        $router->post("/register", "AuthController@register");
        $router->post("/login", "AuthController@login");
    });

    $router->group(["prefix" => "projects"], function() use ($router) {
        $router->post("/", "ProjectController@create");
        $router->get("/{id}", "ProjectController@getProject");

        $router->post("/assign/{id}", "ProjectController@assignUser");
        $router->post("/unassign/{id}", "ProjectController@unassignUser");
    });

    $router->group(["prefix" => "comments"], function () use($router) {
        $router->get("/{id}", "CommentsController@index");
        $router->post("/{id}", "CommentsController@create");
    });

    $router->group(["prefix" => "links"], function () use($router) {
        $router->get("/{id}", "LinksController@index");
        $router->post("/{id}", "LinksController@create");
    });
});
