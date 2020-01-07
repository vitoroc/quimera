"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Menu extends Model {
  role() {
    return this.belongsTo("App/Models/System");
  }
}

module.exports = Menu;
