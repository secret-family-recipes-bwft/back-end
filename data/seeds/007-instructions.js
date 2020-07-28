
exports.seed = function(knex) {
  // 000-cleanup.js already cleaned out all tables
  const instructions = [
    { step_number: 1, instructions: 'Send spouse to Alaska to capture moose, or have one delivered by UPS.', recipe_id: 1 },
    { step_number: 2, instructions: 'While waiting, melt chocolate in very large double boiler.', recipe_id: 1 },
    { step_number: 3, instructions: 'Keep warm.', recipe_id: 1 },
    { step_number: 4, instructions: 'Tie up moose with rope.', recipe_id: 1 },
    { step_number: 5, instructions: 'Holding the moose by the tail, carefully dip in melted chocolate,covering it completely with a thin coating.', recipe_id: 1 },
    { step_number: 6, instructions: 'Arrange moose attractively on large platter and refrigerate for 2 days to set chocolate.', recipe_id: 1 },
    { step_number: 7, instructions: 'Remove rope, wash to remove chocolate,if necessary, and return rope to clothesline', recipe_id: 1 },
    { step_number: 8, instructions: 'Garnish chocolate moose with Cool Whip and top with a cherry.', recipe_id: 1 },

    { step_number: 1, instructions: 'I want my password to be BeefStew...', recipe_id: 2 },
    { step_number: 2, instructions: '... but the app keeps telling me it’s not stroganoff!', recipe_id: 2 },

    { step_number: 1, instructions: 'Empty the ice cubes that are left in the trays (if there are any left) into the bin.', recipe_id: 3 },
    { step_number: 2, instructions: 'Take the trays over to the sink and fill them with cold water', recipe_id: 3 },
    { step_number: 3, instructions: 'Place the water filled ice trays back in the freezer.', recipe_id: 3 },
    { step_number: 4, instructions: 'Be sure to leave for around 4-6 hours at least to make sure it is frozen.', recipe_id: 3 },

    { step_number: 1, instructions: 'Melt the butter in small pot and add the peas.', recipe_id: 4 },
    { step_number: 2, instructions: 'Cook over medium heat until peas are warm.', recipe_id: 4 },

    { step_number: 1, instructions: 'Cut elephant into bite size pieces (this should take about 2 months).', recipe_id: 5 },
    { step_number: 2, instructions: 'Add enough brown gravy to cover.', recipe_id: 5 },
    { step_number: 3, instructions: 'Cook over hot fire for 3 weeks.', recipe_id: 5 },
    { step_number: 4, instructions: 'Should serve up to 3800 people.', recipe_id: 5 },

    { step_number: 1, instructions: 'Spread the peanut butter on one piece of bread.', recipe_id: 6 },
    { step_number: 2, instructions: 'Spread the jelly on the other side.', recipe_id: 6 },
    { step_number: 3, instructions: 'Put the two pieces of bread together to form a sandwich.', recipe_id: 6 },
    { step_number: 4, instructions: 'Toddler adaptation: cut off crusts before serving.', recipe_id: 6 },

  ]

  return knex('instructions').insert(instructions)
  .then(() => console.log("\n== Seed data for recipes table added. ==\n"));
};
