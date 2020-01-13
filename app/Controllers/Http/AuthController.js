"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const User = use("App/Models/User");

class AuthController {
  // async register({ request }) {
  //   const data = request.only(["email", "password", "login", "name"]);
  //   const user = await User.create(data);
  //   // console.log(user);
  //   // const { password, ...userWithoutPassword } = user;
  //   return user;
  // }

  async autenticate({ request, auth, response }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    const user = await User.query()
      .where("email", "=", email)
      .where("valid", "=", true)
      .getCount();

    if (user === 0) return { message: "User is no longer valid" };
    return token;
  }

  async test({ auth, response }) {
    try {
      const a = await auth.getUser();
      response.send(a);
    } catch (error) {
      response.send(error.message);
    }
  }
}

module.exports = AuthController;
