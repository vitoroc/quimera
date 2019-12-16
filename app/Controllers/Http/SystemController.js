"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const System = use("App/Models/System");
const User = use("App/Models/User");
const Env = use("Env");

/**
 * Resourceful controller for interacting with systems
 */
class SystemController {
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

  /**
   * Show a list of all systems.
   * GET systems
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   */
  async index({ auth }) {
    var allowed = await this.userIsAdmin({ auth });
    if (!allowed) return { message: "User not allowed" };

    const systems = System.all();
    return systems;
  }

  /**
   * Render a form to be used for creating a new system.
   * GET systems/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new system.
   * POST systems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single system.
   * GET systems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing system.
   * GET systems/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update system details.
   * PUT or PATCH systems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a system with id.
   * DELETE systems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {}
}

module.exports = SystemController;
