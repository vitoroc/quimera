"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Role extends Model {
  systems() {
    this.belongsTo("App/Models/System");
  }

  userRole() {
    this.hasMany("App/Models/UserRole");
  }
}

module.exports = Role;
