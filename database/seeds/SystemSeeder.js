"use strict";

/*
|--------------------------------------------------------------------------
| SystemSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const System = use("App/Models/System");

class SystemSeeder {
  async run() {
    await System.create({
      id: 1,
      name: "API Quimera",
      description: "API de autenticação para os sistemas da SETC",
      active: true,
      url: "172.22.21.120" + Env.get("APP_NAME", "AdonisJs")
    });
  }
}

module.exports = SystemSeeder;
