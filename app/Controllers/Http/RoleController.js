"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const System = use("App/Models/System");
const User = use("App/Models/User");
const Role = use("App/Models/Role");

/**
 * Resourceful controller for interacting with roles
 */
class RoleController {
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
   * Show a list of all roles.
   * GET roles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ response, auth }) {
    var allowed = await this.userIsAdmin({ auth });
    // if (!allowed) return { message: "User not allowed" };
    if (!allowed) response.unauthorized({ message: "User is not admin" });
    else {
      const roles = await Role.all();
      response.send({ roles });
    }
  }

  /**
   * Create/save a new role.
   * POST roles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {Auth} ctx.auth
   */
  async store({ request, response, auth }) {
    var allowed = await this.userIsAdmin({ auth });
    // if (!allowed) return { message: "User not allowed" };
    if (!allowed) response.unauthorized({ message: "User is not admin" });
    else {
      const data = request.only(["system_id", "name", "description", "active"]);
      const role = await Role.create(data);

      response.send({ message: "Role created successfully", role });
    }
  }

  /**
   * Display a single role.
   * GET roles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, auth }) {
    var allowed = await this.userIsAdmin({ auth });
    const role = await Role.find(params.id);
    // if (!allowed) return { message: "User not allowed" };
    if (!allowed) response.unauthorized({ message: "User is not admin" });
    else response.send({ role });
  }

  /**
   * Update role details.
   * PUT or PATCH roles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    var allowed = await this.userIsAdmin({ auth });
    // if (!allowed) return { message: "User not allowed" };
    if (!allowed) response.unauthorized({ message: "User is not admin" });
    else {
      const { name, description, active, system_id } = request.all();
      const role = await Role.find(params.id);

      if (typeof name !== "undefined") role.name = name;
      if (typeof description !== "undefined") role.description = description;
      if (typeof active !== "undefined") role.active = active;
      if (typeof system_id !== "undefined") role.system_id = system_id;

      await role.save();

      response.send({ message: "Role updated successfully", role });
    }
  }

  /**
   * Delete a role with id.
   * DELETE roles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response, auth }) {
    var allowed = await this.userIsAdmin({ auth });
    // if (!allowed) return { message: "User not allowed" };
    if (!allowed) response.unauthorized({ message: "User is not admin" });
    else {
      const role = await Role.find(params.id);
      if (!role) response.status(404).send({ message: "Role not found" });
      else {
        role.active = false;
        await role.delete();
        response.send({ message: "Role deleted successfully" });
      }
    }
  }
}

module.exports = RoleController;
