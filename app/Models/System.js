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

  params() {
    return this.hasMany("App/Model/Param");
  }
}

module.exports = System;
