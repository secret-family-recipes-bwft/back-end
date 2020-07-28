
exports.seed = function(knex) {
  // 000-cleanup.js already cleaned out all tables

  const recipes_ingredients= [
    { quantity: 1, measure: '', recipe_id: 1, ingredient_id: 1},
    { quantity: 40, measure: 'lbs', recipe_id: 1, ingredient_id: 2},
    { quantity: 17, measure: 'containers', recipe_id: 1, ingredient_id: 3},
    { quantity: 1, measure: '', recipe_id: 1, ingredient_id: 4},

    { quantity: 1, measure: '', recipe_id: 2, ingredient_id: 5},

    { quantity: 2, measure: 'cups', recipe_id: 3, ingredient_id: 6},
    { quantity: 1, measure: '', recipe_id: 3, ingredient_id: 7},

    { quantity: 1/4, measure: 'cups', recipe_id: 4, ingredient_id: 8},
    { quantity: 2, measure: 'cans', recipe_id: 4, ingredient_id: 9},

    { quantity: 1, measure: '', recipe_id: 5, ingredient_id: 10},
    { quantity: 1, measure: '', recipe_id: 5, ingredient_id: 11},
    
    { quantity: 2, measure: 'slices', recipe_id: 6, ingredient_id: 12},
    { quantity: 2, measure: 'tbs', recipe_id: 6, ingredient_id: 13},
    { quantity: 2, measure: 'tbs', recipe_id: 6, ingredient_id: 14},
  ]
      

      return knex('recipes_ingredients').insert(recipes_ingredients)
      .then(() => console.log("\n== Seed data for recipes table added. ==\n"));
};
