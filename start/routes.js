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
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
const Route = use("Route");

Route.get("/", async ({ response }) => {
  response.send({ greeting: "Quimera running ..." });
});

// Route.post("/register", "AuthController.register");
Route.post("/autenticate", "AuthController.autenticate");
// Route.get("/app", "AppController.index").middleware(["auth"]);

Route.group(() => {
  Route.resource("users", "UserController").apiOnly();
  // Route.resource("orgaos", "OrgaoController")
  //   .apiOnly()
  //   .except("show")
  //   .except("update");
  Route.get("orgaos", "OrgaoController.index");
  Route.get("orgaos/:codigo", "OrgaoController.show");
  Route.post("orgaos", "OrgaoController.store");
  Route.put("orgaos/:codigo", "OrgaoController.update");
  Route.delete("orgaos/:codigo", "OrgaoController.destroy");
  // Route.resource("systems", "SystemController").apiOnly();

  Route.get("user-info", "UserController.userRoles");

  // Route.get("systems", "SystemController.index");
  Route.resource("systems", "SystemController").apiOnly();
}).middleware(["auth"]);

Route.get("/test", "OrgaoController.index").middleware(["auth"]);
