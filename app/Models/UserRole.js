"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class UserRole extends Model {
  role() {
    return this.belongsTo("App/Models/Role");
  }

  user() {
    return this.belongsTo("App/Model/User");
  }
}

module.exports = UserRole;
