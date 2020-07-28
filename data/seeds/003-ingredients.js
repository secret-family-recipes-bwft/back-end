
exports.seed = function(knex) {
  // 000-cleanup.js already cleaned out all tables
  const ingredients = [
    { name: 'mooose'},
    { name: 'hershey chocolate'},
    { name: 'cool whip'},
    { name: 'cherries'},
    { name: 'bad sense of humor'},
    { name: 'water'},
    { name: 'ice cubes tray'},
    { name: 'butter'},
    { name: 'English peas'},
    { name: 'elephant'},
    { name: 'salt and/or pepper'},
    { name: 'bread'},
    { name: 'peanut butter'},
    { name: 'grape or strawberry jelly'}
  ]

      return knex('ingredients').insert(ingredients)
      .then(() => console.log("\n== Seed data for recipes table added. ==\n"));
};
