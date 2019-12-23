"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Quimera running" };
});

// Route.post("/register", "AuthController.register");
Route.post("/autenticate", "AuthController.autenticate");
Route.get("/app", "AppController.index").middleware(["auth"]);

Route.group(() => {
  Route.resource("users", "UserController").apiOnly();
  Route.resource("orgaos", "OrgaoController")
    .apiOnly()
    .except("show")
    .except("update");
  Route.get("orgaos/:codigo", "OrgaoController.show");
  Route.put("orgaos/:codigo", "OrgaoController.update");
  // Route.resource("systems", "SystemController").apiOnly();
}).middleware(["auth"]);

Route.get("/test", "OrgaoController.index").middleware(["auth"]);
