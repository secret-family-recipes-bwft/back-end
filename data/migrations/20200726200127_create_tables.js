
exports.up = function(knex) {
  return knex.schema
  .createTable('users', tbl => {
    tbl.increments()

    tbl.string('username', 256).unique().notNullable().index()
    tbl.string('password').notNullable()
    tbl.string('email', 256).notNullable().unique()
  })
  .createTable('recipes', tbl => {
    tbl.increments()

    tbl.string('title', 255).notNullable().index()
    tbl.string('source', 256).notNullable()
    tbl.text('ingredients').notNullable()
    tbl.text('instructions').notNullable()
    tbl.string('category').notNullable()
    tbl.string('picture_url')

    tbl.integer('user_id')
    .unsigned()
    .notNullable()
    .references('users.id')
    .onUpdate('CASCADE') //--> for foreign keys
    .onDelete('CASCADE') //--> for foreign keys
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('recipes')
  .dropTableIfExists('users')
};
