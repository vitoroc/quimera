"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserLogSchema extends Schema {
  up() {
    this.create("user_logs", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("RESTRICT")
        .onDelete("RESTRICT");
      table.string("text").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("user_logs");
  }
}

module.exports = UserLogSchema;
