'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleMenuSchema extends Schema {
  up () {
    this.create('role_menus', (table) => {
      table.increments()
      table.timestamps()
    })
  }

  down () {
    this.drop('role_menus')
  }
}

module.exports = RoleMenuSchema
