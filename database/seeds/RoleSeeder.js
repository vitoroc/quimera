"use strict";

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const Role = use("App/Models/Role");

class RoleSeeder {
  async run() {
    await Role.create({
      system_id: 1,
      name: "admin",
      description: "Administrador do sistema",
      active: true
    });
  }
}

module.exports = RoleSeeder;
