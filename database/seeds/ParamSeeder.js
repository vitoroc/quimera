"use strict";

/*
|--------------------------------------------------------------------------
| ParamSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const Param = use("App/Models/Param");

class ParamSeeder {
  async run() {
    await Param.create({
      system_id: 1,
      name: "senha_padrao",
      value: "123456",
      active: true
    });
  }
}

module.exports = ParamSeeder;
