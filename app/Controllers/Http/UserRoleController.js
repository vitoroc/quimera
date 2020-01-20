"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User");
const Role = use("App/Models/Role");
const UserRole = use("App/Models/UserRole");
const System = use("App/Models/System");

/**
 * Resourceful controller for interacting with userroles
 */
class UserRoleController {
  /**
   * Return if user have a admin role.
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
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

  /**
   * Show a list of all userroles.
   * GET userroles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ auth, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "User not allowed" });
    else {
      const userroles = await UserRole.all();
      response.send({ userroles });
    }
  }

  /**
   * Create/save a new userrole.
   * POST userroles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "User not allowed" });
    else {
      const data = request.only(["role_id", "user_id", "active"]);
      const userrole = await UserRole.create(data);
      response.send({ message: "UserRole created successfully", userrole });
    }
  }

  /**
   * Display a single userrole.
   * GET userroles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ auth, params, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "User not allowed" });
    const userrole = await UserRole.find(params.id);
    if (!userrole) response.status(404).send({ message: "UserRole not found" });
    else response.send(userrole);
  }

  /**
   * Update userrole details.
   * PUT or PATCH userroles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "User not allowed" });
    else {
      const userrole = await UserRole.find(params.id);
      if (!userrole)
        response.status(404).send({ message: "UserRole not found" });
      else {
        const { user_id, role_id, active } = await request.all();
        if (typeof user_id !== "undefined") userrole.user_id = user_id;
        if (typeof role_id !== "undefined") userrole.role_id = role_id;
        if (typeof active !== "undefined") userrole.active = active;

        await userrole.save();
        response.send({ message: "UserRole updated successfully", userrole });
      }
    }
  }

  /**
   * Delete a userrole with id.
   * DELETE userroles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "User not allowed" });
    else {
      const userrole = await UserRole.find(params.id);
      if (!userrole)
        response.status(404).send({ message: "UserRole not found" });
      else {
        await userrole.delete();
        response.send({ message: "UserRole deleted successfully" });
      }
    }
  }
}

module.exports = UserRoleController;
