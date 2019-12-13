"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const User = use("App/Models/User");
const System = use("App/Models/System");
const Role = use("App/Models/Role");
const Database = use("Database");

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async userIsAdmin({ auth }) {
    var allowed = false;

    const system = await System.find(1);
    const role_admin_system = await system
      .roles()
      .where("name", "admin")
      .fetch();

    const user = await User.find(auth.user.id);
    const user_roles = await user.roles().fetch();

    user_roles["rows"].forEach(el => {
      if (el.toJSON().id === role_admin_system["rows"][0].id) {
        allowed = true;
      }
    });

    return allowed;
  }

  async index({ auth }) {
    var allowed = await this.userIsAdmin({ auth });

    if (!allowed) return { message: "User not allowed" };

    const users = await User.all();
    return users;
  }

  /**
   * Create/save a new user.
   * POST user
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single user.
   * GET user/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, auth }) {
    var allowed = await this.userIsAdmin({ auth });
    if (!allowed) return { message: "User not allowed" };

    const user = await User.find(params.id);
    if (!user) return { message: "User not found" };

    return user;
  }

  /**
   * Update user details.
   * PUT or PATCH user/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a user with id.
   * DELETE user/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {
    const user = await User.find(params.id);
    if (!user) return { message: "User not found" };

    await user.delete();
    return { message: "Usuario deletado com sucesso" };
  }
}

module.exports = UserController;
