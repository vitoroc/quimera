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
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Auth} ctx.auth
   */
  async index({ auth, response }) {
    var allowed = await this.userIsAdmin({ auth });
    const users = await User.all();
    // if (!allowed) return { message: "User not allowed" };
    if (!allowed) response.unauthorized({ message: "User is not admin" });
    else response.send({ users });

    // const users = await User.all();
    // return users;
  }

  /**
   * Create/save a new user.
   * POST user
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Auth} ctx.auth
   */
  async store({ request, auth, response }) {
    var allowed = await this.userIsAdmin({ auth });

    const data = request.only([
      "email",
      "password",
      "login",
      "name",
      "orgao_codigo"
    ]);

    if (!allowed) response.unauthorized({ message: "User is not admin" });
    else {
      const user = await User.create(data);
      response.send({ message: "User created successfully", user });
    }
  }

  /**
   * Display a single user.
   * GET user/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, auth, response }) {
    var allowed = await this.userIsAdmin({ auth });
    // if (!allowed) return { message: "User not allowed" };
    const user = await User.find(params.id);
    if (!allowed) response.unauthorized({ message: "User is not admin" });
    else if (!user) response.status(404).send({ message: "User not found" });
    else response.send({ user });

    // const user = await User.find(params.id);
    // if (!user) return { message: "User not found" };

    // return user;
  }

  /**
   * Update user details.
   * PUT or PATCH user/:id
   * The user can only update his own atributes
   * Email, password, login and name
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ request, auth }) {
    const user = await User.find(auth.user.id);
    if (!user) response.status(404).send({ message: "User not found" });
    else {
      const { email, password, login, name } = request.all();
      console.log(email, password, login, name);
      // console.log(user.toJSON());
      // console.log(data);
      if (typeof email !== "undefined") user.email = email;
      if (typeof password !== "undefined") user.password = password;
      if (typeof login !== "undefined") user.login = login;
      if (typeof name !== "undefined") user.name = name;

      //return user;

      // console.log(user.toJSON());
      await user.save();
      response.send({ user });
    }
  }

  /**
   * Delete a user with id.
   * DELETE user/:id
   * Only if the user autenticated have a admin role
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Params} ctx.params
   */
  async destroy({ params, auth, response }) {
    var allowed = await this.userIsAdmin({ auth });
    // if (!allowed) return { message: "User not allowed" };
    if (!allowed) response.unauthorized({ message: "User not allowed" });
    else {
      const user = await User.find(params.id);
      if (!user) response.status(404).send({ message: "User not found" });
      else if (user.id === 1)
        response.status(403).send({ message: "Admin cannot be invalidated" });
      else {
        if (user.valid == false)
          response.send({ message: "User already invalidated" });
        else {
          user.valid = false;

          await user.save();
          console.log(user);
          response.send({ message: "Usuario invalidated successfully" });
        }
      }
    }

    // const user = await User.find(params.id);
    // if (!user) return { message: "User not found" };
    // if (user.id === 1) return { message: "Admin cannot be invalidated" };

    // user.valid = false;

    // await user.save();
    // console.log(user);
    // return { message: "Usuario invalidated successfully" };
  }

  /**
   * Return user's roles.
   *
   */
  async userRoles({ auth }) {
    const user = await User.find(auth.user.id);
    // if (!user) return { message: "User not found" };
    if (!user) response.status(404).send({ message: "User not found" });
    else {
      const user = await user.roles().fetch();
      response.send(user);
    }

    // return user.roles().fetch();
  }
}

module.exports = UserController;
