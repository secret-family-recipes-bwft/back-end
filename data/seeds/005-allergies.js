
exports.seed = function(knex) {
  // 000-cleanup.js already cleaned out all tables
  const allergies = [
    { type: 'dairy'},
    { type: 'gluten'},
    { type: 'nuts'}
  ]

  return knex('allergies').insert(allergies)
  .then(() => console.log("\n== Seed data for recipes table added. ==\n"));

};
