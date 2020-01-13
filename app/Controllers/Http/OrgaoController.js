"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const UserController = require("./UserController");
const User = use("App/Models/User");
const System = use("App/Models/System");
const Orgao = use("App/Models/Orgao");

/**
 * Resourceful controller for interacting with orgaos
 */
class OrgaoController {
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
   * Show a list of all orgaos.
   * GET orgaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth, response }) {
    const allowed = await this.userIsAdmin({ auth });
    const orgaos = await Orgao.all();
    if (!allowed) response.status(403).send({ message: "User not allowed" });
    else response.send({ orgaos });
  }

  /**
   * Create/save a new orgao.
   * POST orgaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth, response }) {
    // console.log(request.all());
    // response.send({ request: request });

    // return request;

    // console.log(resquest.all());
    // response.send({ message: "Test", request: request.all() });

    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) response.unauthorized({ message: "User not allowed" });
    else {
      const data = request.only([
        "codigo",
        "cnpj",
        "sigla",
        "descricao",
        "natureza",
        "ativo"
      ]);

      const orgao = await Orgao.create(data);
      response.send({ message: "Orgao created successfully", orgao });
    }
  }

  /**
   * Display a single orgao.
   * GET orgaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, auth, response }) {
    const allowed = await this.userIsAdmin({ auth });
    // if (!allowed) return { message: "User not allowed" };
    if (!allowed) response.unauthorized({ message: "User not allowed" });
    else {
      const qntOrgao = await Orgao.query()
        .where("codigo", "=", params.codigo)
        .getCount();

      if (qntOrgao === 0)
        response.status(404).send({ message: "Orgao not found" });
      else {
        const orgao = await Orgao.query()
          .where("codigo", "=", params.codigo)
          .fetch();
        response.send({ orgao });
      }
    }
  }

  /**
   * Update orgao details.
   * PUT or PATCH orgaos/:codigo
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, auth, response }) {
    const allowed = await this.userIsAdmin({ auth });
    // if (!allowed) return { message: "User not allowed" };
    if (!allowed) response.unauthorized({ message: "User not allowed" });
    else {
      const {
        codigo,
        sigla,
        cnpj,
        natureza,
        ativo,
        descricao
      } = await request.all();

      const countOrg = await Orgao.query()
        .where("codigo", "=", params.codigo)
        .getCount();

      // if (countOrg === 0) return { message: "Orgao not found" };
      if (countOrg === 0)
        response.status(404).send({ message: "Orgao not found" });
      else {
        const orgaoAux = await Orgao.query()
          .where("codigo", "=", params.codigo)
          .fetch();

        const orgao = await Orgao.find(orgaoAux.toJSON()[0].id);

        if (typeof codigo !== "undefined") orgao.codigo = codigo;
        if (typeof sigla !== "undefined") orgao.sigla = sigla;
        if (typeof cnpj !== "undefined") orgao.cnpj = cnpj;
        if (typeof natureza !== "undefined") orgao.natureza = natureza;
        if (typeof ativo !== "undefined") orgao.ativo = ativo;
        if (typeof descricao !== "undefined") orgao.descricao = descricao;

        await orgao.save();
        response.send({ message: "Orgao updated successfully", orgao });
      }
    }
  }

  /**
   * Delete a orgao with id.
   * DELETE orgaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async destroy({ params, auth, response }) {
    const allowed = await this.userIsAdmin({ auth });
    // if (!allowed) return { message: "User not allowed" };
    if (!allowed) response.unauthorized({ message: "User not allowed" });
    else {
      const countOrg = await Orgao.query()
        .where("codigo", "=", params.codigo)
        .getCount();

      if (countOrg === 0)
        response.status(404).send({ message: "Orgao not found" });
      else {
        const orgaoAux = await Orgao.query()
          .where("codigo", "=", params.codigo)
          .fetch();

        const orgao = await Orgao.find(orgaoAux.toJSON()[0].id);
        await orgao.delete();

        response.send({ message: "Orgao deleted successfully" });
      }
    }
  }
}

module.exports = OrgaoController;
