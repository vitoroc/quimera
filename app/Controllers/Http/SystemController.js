"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const System = use("App/Models/System");
const User = use("App/Models/User");
const Role = use("App/Models/Role");

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
  async index({ auth, response }) {
    var allowed = await this.userIsAdmin({ auth });
    // if (!allowed) return { message: "User not allowed" };
    if (!allowed) response.unauthorized({ message: "User is not admin" });
    else {
      const systems = await System.all();
      response.send({ systems });
    }
  }

  /**
   * Create/save a new system.
   * POST systems
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    var allowed = await this.userIsAdmin({ auth });
    // if (!allowed) return { message: "User not allowed" };
    if (!allowed) response.unauthorized({ message: "User is not admin" });
    else {
      const data = request.only(["name", "description", "active", "url"]);
      const system = await System.create(data);

      response.send({ message: "System created successfully", system });
    }

    // const data = request.only(["name", "description", "active", "url"]);
    // const system = await System.create(data);

    // return { message: "System created successfully", system };
  }

  /**
   * Display a single system.
   * GET systems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, auth, response }) {
    // var allowed = await this.userIsAdmin({ auth });
    var allowed = true;
    if (!allowed) response.unauthorized({ message: "User is not admin" });
    else {
      const system = await System.find(params.id);
      if (!system) response.status(404).send({ message: "System not found" });
      else {
        await system.load("roles");
        response.send({ system });
      }
    }

    // const system = await System.find(params.id);
    // if (!system) return { message: "System not found" };

    // return system;

    // response.status(403).send("oie");
  }

  /**
   * Update system details.
   * PUT or PATCH systems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, auth, response }) {
    var allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "User is not admin" });
    else {
      const system = await System.find(params.id);
      if (!system) response.status(404).send({ message: "System not found" });
      else {
        const { name, description, active, url } = request.all();

        if (typeof name !== "undefined") system.name = name;
        if (typeof description !== "undefined")
          system.description = description;
        if (typeof active !== "undefined") system.active = active;
        if (typeof url !== "undefined") system.url = url;

        await system.save();
        response.send({ message: "System updated successfully", system });
      }
    }
  }

  /**
   * Delete a system with id.
   * DELETE systems/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth, response }) {
    var allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "User is not admin" });
    else {
      if (params.id == 1)
        response.status(403).send({ message: "Main system cannot be deleted" });
      else {
        const system = await System.find(params.id);
        if (!system) response.status(404).send({ message: "System not found" });
        else {
          await system.delete();
          response.send({ message: "System deleted successfully" });
        }
      }
    }
  }
}

module.exports = SystemController;
