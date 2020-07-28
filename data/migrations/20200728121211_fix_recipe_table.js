
exports.up = function (knex) {
    return knex.schema.table('recipes', tbl => {
        tbl.dropColumn('ingredients')
        tbl.dropColumn('instructions')

        tbl.string('country_of_origin').notNullable().defaultTo('')
        tbl.text('tradition', 'LONGTEXT').defaultTo('none')
        tbl.string('originator', 256).defaultTo('')
        tbl.string('prepTime').defaultTo('0 minutes')
        tbl.integer('serving_size').defaultTo(1)
    })
    
    // many to many --> third table
    .createTable('ingredients', tbl => {
        tbl.increments()

        tbl.string('name', 256).notNullable()
    })
    .createTable('recipes_ingredients', tbl => {
        tbl.float('quantity').unsigned().notNullable() 
        tbl.string('measure').notNullable()  

        tbl.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipes.id')
        .onUpdate('CASCADE') //--> for foregin keys
        .onDelete('CASCADE') //--> for foregin keys

        tbl.integer('ingredient_id')
        .unsigned()
        .notNullable()
        .references('ingredients.id')
        .onUpdate('CASCADE') //--> for foregin keys
        .onDelete('CASCADE') //--> for foregin keys
    })

    //many to many --> third table
    .createTable('allergies', tbl => {
        tbl.increments()

        tbl.string('type', 256).notNullable()
    })
    .createTable('recipes_allergies', tbl => {
  
        tbl.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipes.id')
        .onUpdate('CASCADE') //--> for foregin keys
        .onDelete('CASCADE') //--> for foregin keys

        tbl.integer('allergy_id')
        .unsigned()
        .notNullable()
        .references('allergies.id')
        .onUpdate('CASCADE') //--> for foregin keys
        .onDelete('CASCADE') //--> for foregin keys
    })

    //one to many
    .createTable('instructions', tbl => {
        tbl.increments()

        tbl.integer('step_number').unsigned().notNullable()
        tbl.text('instructions').notNullable()

        tbl.integer('recipe_id')
        .unsigned()
        .notNullable()
        .references('recipes.id')
        .onUpdate('CASCADE') //--> for foregin keys
        .onDelete('CASCADE') //--> for foregin keys
    })
};

exports.down = function (knex) {
    return knex.schema.table('recipes', tbl => {
        tbl.text('ingredients').notNullable().defaultTo('')
        tbl.text('instructions').notNullable().defaultTo('')

        tbl.dropColumn('country_of_origin')
        tbl.dropColumn('tradition')
        tbl.dropColumn('originator')
        tbl.dropColumn('prepTime')
        tbl.dropColumn('serving_size')
    })
    .dropTableIfExists('instructions')
    .dropTableIfExists('recipes_allergies')
    .dropTableIfExists('allergies')
    .dropTableIfExists('recipes_ingredients')
    .dropTableIfExists('ingredients')
};
