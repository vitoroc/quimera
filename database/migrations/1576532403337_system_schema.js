"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class SystemSchema extends Schema {
  up() {
    this.create("systems", table => {
      table.increments();
      table.string("name", 100).notNullable();
      table.string("description", 200);
      table.boolean("active");
      table.string("url", 100);
      table.timestamps();
    });
  }

  down() {
    this.drop("systems");
  }
}

module.exports = SystemSchema;
