"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ParamSchema extends Schema {
  up() {
    this.create("params", table => {
      table.increments();
      table
        .integer("system_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("systems")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name", 254).notNullable();
      table.string("value", 254).notNullable();
      table.timestamp("deleted_at").nullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("params");
  }
}

module.exports = ParamSchema;
