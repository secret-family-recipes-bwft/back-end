
exports.seed = function(knex) {
  // 000-cleanup.js already cleaned out all tables
  const recipes_allergies = [
    { recipe_id: 1, allergy_id: 1},
    { recipe_id: 4, allergy_id: 1},
    { recipe_id: 6, allergy_id: 2},
    { recipe_id: 6, allergy_id: 3}
  ]

  return knex('recipes_allergies').insert(recipes_allergies)
  .then(() => console.log("\n== Seed data for recipes table added. ==\n"));

};