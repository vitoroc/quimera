"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class UserRole extends Model {
  system() {
    this.belongsTo("App/Models/Role");
  }

  user() {
    this.belongsTo("App/Model/User");
  }
}

module.exports = UserRole;
