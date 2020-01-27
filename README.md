# Quimera API

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick --api-only
```

or manually clone the repo and then run `npm install`.

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

### Database commands

adonis migration:reset
adonis migration:run
adonis seed --files='OrgaoSeeder.js'
adonis seed --files='UserSeeder.js'
adonis seed --files='SystemSeeder.js'
adonis seed --files='RoleSeeder.js'
adonis seed --files='UserRoleSeeder.js'
adonis seed --files='ParamSeeder.js'
