"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class RoleMenuSchema extends Schema {
  up() {
    this.create("role_menus", table => {
      table.increments();
      table
        .integer("role_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("roles")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("menu_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("menus")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.timestamps();
    });
  }

  down() {
    this.drop("role_menus");
  }
}

module.exports = RoleMenuSchema;
