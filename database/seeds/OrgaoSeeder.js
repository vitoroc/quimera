"use strict";

/*
|--------------------------------------------------------------------------
| OrgaoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

const Orgao = use("App/Models/Orgao");

class OrgaoSeeder {
  async run() {
    await Orgao.create({
      codigo: 36000,
      cnpj: "13.128.798/0009-50",
      sigla: "SETC",
      descricao: "Secretaria de Estado de Transparência e Controle",
      natureza: "Administração Direta",
      ativo: true
    });
  }
}

module.exports = OrgaoSeeder;
