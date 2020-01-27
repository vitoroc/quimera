"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User");
const System = use("App/Models/System");
const Param = use("App/Models/Param");

/**
 * Resourceful controller for interacting with params
 */
class ParamController {
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
   * Show a list of all params.
   * GET params
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   * @param {Response} ctx.response
   */
  async index({ auth, response }) {
    const allowed = await this.userIsAdmin({ auth });
    const params = await Param.all();
    if (!allowed) response.unauthorized({ message: "Usuário não autorizado" });
    else response.send({ params });
  }

  /**
   * Create/save a new param.
   * POST params
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "Usuário não autorizado" });
    else {
      const data = request.only(["system_id", "name", "value", "active"]);
      const param = await Param.create(data);
      response.send({ message: "Parâmetro criado com sucesso", param });
    }
  }

  /**
   * Display a single param.
   * GET params/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ auth, params, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "Usuário não autorizado" });
    else {
      const param = await Param.find(params.id);
      if (!param)
        response.status(404).send({ message: "Parâmetro não encontrado" });
      else response.send({ param });
    }
  }

  /**
   * Update param details.
   * PUT or PATCH params/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "Usuário não autorizado" });
    else {
      const param = await Param.find(params.id);

      if (!param)
        response.status(404).send({ message: "Parâmetro não encontrado" });
      else {
        const {
          system_id,
          name,
          value,
          deleted_at,
          active
        } = await request.all();
        if (typeof system_id !== "undefined") param.system_id = system_id;
        if (typeof name !== "undefined") param.name = name;
        if (typeof value !== "undefined") param.value = value;
        if (typeof active !== "undefined") param.active = active;
        if (typeof deleted_at !== "undefined") param.deleted_at = deleted_at;

        await param.save();
        response.send({ message: "Parâmetro atualizado com sucesso", param });
      }
    }
  }

  /**
   * Delete a param with id.
   * DELETE params/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, request, response }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "Usuário não autorizado" });
    else {
      const param = await Param.find(params.id);
      if (!param)
        response.status(404).send({ message: "Parâmetro não encontrado" });
      else {
        if (param.id === 1)
          response
            .status(403)
            .send({ message: "Parâmetro não pode ser deletado" });
        else {
          await param.delete();
          response.send({ message: "Parâmetro deletado com sucesso" });
        }
      }
    }
  }
}

module.exports = ParamController;
