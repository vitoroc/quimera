"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class System extends Model {
  roles() {
    return this.hasMany("App/Models/Role");
  }

  menus() {
    return this.hasMany("App/Models/Menu");
  }
}

module.exports = System;
