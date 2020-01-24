"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Param extends Model {
  orgao() {
    return this.belongsTo("App/Models/System");
  }
}

module.exports = Param;
