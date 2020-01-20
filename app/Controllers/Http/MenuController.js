"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Menu = use("App/Models/Menu");
const User = use("App/Models/User");
const System = use("App/Models/System");

/**
 * Resourceful controller for interacting with menus
 */
class MenuController {
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
   * Show a list of all menus.
   * GET menus
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "Usuário não autorizado" });
    else {
      const menus = await Menu.all();
      response.send({ menus });
    }
  }

  /**
   * Create/save a new menu.
   * POST menus
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "Usuário não autorizado" });
    else {
      const data = request.only(["system_id", "name", "description", "active"]);
      const menu = await Menu.create(data);
      response.send({ message: "Menu criado com sucesso", menu });
    }
  }

  /**
   * Display a single menu.
   * GET menus/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, auth, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "Usuário não autorizado" });
    const menu = await Menu.find(params.id);
    if (!menu) response.status(404).send({ message: "Menu não encontrado" });
    else response.send(menu);
  }

  /**
   * Update menu details.
   * PUT or PATCH menus/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "Usuário não autorizado" });
    else {
      const menu = await Menu.find(params.id);
      if (!menu) response.status(404).send({ message: "Menu não encontrado" });
      else {
        const { system_id, name, description, active } = await request.all();
        if (typeof system_id !== "undefined") menu.user_id = system_id;
        if (typeof name !== "undefined") menu.role_id = name;
        if (typeof description !== "undefined") menu.active = description;
        if (typeof active !== "undefined") menu.active = active;

        await menu.save();
        response.send({ message: "Menu atualizado com sucesso", menu });
      }
    }
  }

  /**
   * Delete a menu with id.
   * DELETE menus/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "Usuário não autorizado" });
    else {
      const menu = await Menu.find(params.id);
      if (!menu) response.status(404).send({ message: "Menu não encontrado" });
      else {
        await menu.delete();
        response.send({ message: "Menu deletado com sucesso" });
      }
    }
  }
}

module.exports = MenuController;
