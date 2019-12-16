"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class OrgaoSchema extends Schema {
  up() {
    this.create("orgaos", table => {
      table.increments();
      table
        .integer("codigo")
        .notNullable()
        .unique();
      table
        .string("cnpj")
        .notNullable()
        .unique();
      table
        .string("sigla")
        .notNullable()
        .unique();
      table
        .string("descricao")
        .notNullable()
        .unique();
      table
        .string("natureza")
        .notNullable()
        .unique();
      table.boolean("ativo").notNullable();
      table.timestamps();
    });

    // this.alter("users", table => {
    //   table
    //     .integer("orgao_codigo")
    //     .notNullable()
    //     .references("codigo")
    //     .inTable("orgaos")
    //     .onDelete("SET NULL");
    // });
  }

  down() {
    this.drop("orgaos");
  }
}

module.exports = OrgaoSchema;
