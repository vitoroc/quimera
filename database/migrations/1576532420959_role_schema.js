"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RoleSchema extends Schema {
  up() {
    this.create("roles", table => {
      table.increments();
      table
        .integer("system_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("systems")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("name").notNullable();
      table.string("description").notNullable();
      table.boolean("active").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("roles");
  }
}

module.exports = RoleSchema;
