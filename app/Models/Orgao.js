"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Orgao extends Model {
  static boot() {
    super.boot();
  }

  users() {
    return this.hasMany("App/Models/User");
  }
}

module.exports = Orgao;
