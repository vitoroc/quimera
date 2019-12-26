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
  async index({ auth }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) return { message: "User not allowed" };

    const orgaos = await Orgao.all();
    return orgaos;
  }

  /**
   * Create/save a new orgao.
   * POST orgaos
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) return { message: "User not allowed" };

    const data = request.only([
      "codigo",
      "cnpj",
      "sigla",
      "descricao",
      "natureza",
      "ativo"
    ]);

    const orgao = await Orgao.create(data);
    return { message: "Orgao created successfully", orgao };
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
  async show({ params, auth }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) return { message: "User not allowed" };

    const qntOrgao = await Orgao.query()
      .where("codigo", "=", params.codigo)
      .getCount();

    if (qntOrgao === 0) return { message: "Orgao not found" };

    const orgao = await Orgao.query()
      .where("codigo", "=", params.codigo)
      .fetch();
    return orgao;
  }

  /**
   * Update orgao details.
   * PUT or PATCH orgaos/:codigo
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, auth }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) return { message: "User not allowed" };

    const { codigo, sigla, cnpj, natureza, ativo, descricao } = request.all();

    const countOrg = await Orgao.query()
      .where("codigo", "=", params.codigo)
      .getCount();

    if (countOrg === 0) return { message: "Orgao not found" };

    const orgaoAux = await Orgao.query()
      .where("codigo", "=", params.codigo)
      .fetch();

    console.log(orgaoAux.toJSON()[0].id);

    const orgao = await Orgao.find(orgaoAux.toJSON()[0].id);

    if (codigo) orgao.codigo = codigo;
    if (sigla) orgao.sigla = sigla;
    if (cnpj) orgao.cnpj = cnpj;
    if (natureza) orgao.natureza = natureza;
    if (ativo) orgao.ativo = ativo;
    if (descricao) orgao.descricao = descricao;

    await orgao.save();
    return orgao;
  }

  /**
   * Delete a orgao with id.
   * DELETE orgaos/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async destroy({ params, auth }) {
    const allowed = await this.userIsAdmin({ auth });
    if (!allowed) return { message: "User not allowed" };

    const countOrg = await Orgao.query()
      .where("codigo", "=", params.codigo)
      .getCount();

    if (countOrg === 0) return { message: "Orgao not found" };

    const orgaoAux = await Orgao.query()
      .where("codigo", "=", params.codigo)
      .fetch();

    const orgao = await Orgao.find(orgaoAux.toJSON()[0].id);

    orgao.ativo = false;
    await orgao.save();

    return { message: "Orgao invalidated successfully" };
  }
}

module.exports = OrgaoController;
