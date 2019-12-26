"use strict";

const User = use("App/Models/User");

class AuthController {
  // async register({ request }) {
  //   const data = request.only(["email", "password", "login", "name"]);
  //   const user = await User.create(data);
  //   // console.log(user);
  //   // const { password, ...userWithoutPassword } = user;
  //   return user;
  // }

  async autenticate({ request, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    const user = await User.query()
      .where("email", "=", email)
      .where("valid", "=", true)
      .getCount();

    if (user === 0) return { message: "User is no longer valid" };
    return token;
  }
}

module.exports = AuthController;
