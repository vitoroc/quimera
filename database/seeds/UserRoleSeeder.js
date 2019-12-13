"use strict";

/*
|--------------------------------------------------------------------------
| UserRoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const UserRole = use("App/Models/UserRole");

class UserRoleSeeder {
  async run() {
    await UserRole.create({
      user_id: 1,
      role_id: 1
    });
  }
}

module.exports = UserRoleSeeder;
