"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all userroles.
   * GET userroles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ request, response }) {
    const users = await User.all();
    return users;
  }

  /**
   * Create/save a new userrole.
   * POST userroles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {}

  /**
   * Display a single userrole.
   * GET userroles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {
    const user = await User.find(params.id);
    console.log(user);
    if (!user) return { message: "User not found" };

    const { $attributes } = user;
    const { password, ...userWithouPassword } = $attributes;
    return userWithouPassword;
  }

  /**
   * Update userrole details.
   * PUT or PATCH userroles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {}

  /**
   * Delete a userrole with id.
   * DELETE userroles/:id
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
