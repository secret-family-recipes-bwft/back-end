
exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

const recipes = [

        {
          user_id: 1,
          title: 'Chocolate Moose',
          source: 'marta',
          ingredients: '1) 1: moose \n2) 40 lbs: hershey chocolate \n3) 17 containters: Cool Whip \n4) 1: cherries',
          instructions: '1) Send spouse to Alaska to capture moose, or have one delivered by UPS. \n2) While waiting, melt chocolate in very large double boiler. \n3) Keep warm. \n4) Tie up moose with rope. \n5) Holding the moose by the tail, carefully dip in melted chocolate, covering it completely with a thin coating. \n6) Arrange moose attractively on large platter and refrigerate for 2 days to set chocolate. \n7) Remove rope, wash to remove chocolate,if necessary, and return rope to clothesline \n8) Garnish chocolate moose with Cool Whip and top with a cherry.',
          category: 'dessert',
          picture_url: 'https://3.bp.blogspot.com/_g25bDp45_Kg/TFbsTko738I/AAAAAAAAy4U/gDA0MK_KOYo/s1600/choc+moose+maine.png'
        },
        {
          user_id: 1,
          title: 'Punny Recipe',
          source: 'marta',
          ingredients: '1) 1: bad sense of humor',
          instructions: '1) I want my password to be BeefStew... \n2)... but the app keeps telling me it’s not stroganoff!',
          category: 'jokes',
          picture_url: 'https://www.tasteofhome.com/wp-content/uploads/2018/02/noodledadjoke.jpg'
        },
        {
          user_id: 2,
          title: 'Ice Cubes',
          source: 'isaac',
          ingredients: '1) 2 cups: water (may add more if needed) \n2)1: ice cubes tray',
          instructions: '1) Empty the ice cubes that are left in the trays (if there are any left) into the bin. \n2) Take the trays over to the sink and fill them with cold water. (Hot water will freeze faster and more clear). \n3) Place the water filled ice trays back in the freezer. \n4) Shut the door to the freezer. \n5) Be sure to leave for around 4-6 hours at least to make sure it is frozen.',
          category: 'snacks',
          picture_url: 'https://img.sndimg.com/food/image/upload/c_thumb,q_80,w_721,h_406/v1/img/recipes/42/03/98/picqRNQfS.jpg'
        },
        {
          user_id: 2,
          title: 'English Peas',
          source: 'isaac',
          ingredients: '1) 1/4 cup (approx. 1/2 stick): butter \n2) 2 cans (approx. 14.5 ounces): English peas (drained)',
          instructions: '1) Melt the butter in small pot and add the peas. \n2) Cook over medium heat until peas are warm.',
          category: 'dinner',
          picture_url: 'https://ugc-01.cafemomstatic.com/gen/constrain/740/1500/75/2012/09/10/18/4y/2n/phjr669s841.jpg'
        },
        {
          user_id: 3,
          title: 'Elephant Stew for Big Parties',
          source: 'joe',
          ingredients: '1) 1: elephant \n2) 2: rabbits (optional) \n3) salt and pepper for taste',
          instructions: '1)Cut elephant into bite size pieces (this should take about 2 months). \n2) Add enough brown gravy to cover. \n3) Cook over hot fire for 3 weeks. \n) Should serve up to 3800 people.',
          category: 'dinner',
          picture_url: 'https://images-na.ssl-images-amazon.com/images/I/61HppnpX6fL._SX258_BO1,204,203,200_.jpg'
        },
        {
          user_id: 3,
          title: 'Peanut Butter & Jelly',
          source: 'joe',
          ingredients: '1) 2 slices: sandwich bread \n2) 2 tbs: peanut butter \n3) 2 tsp: grape or strawberry jelly',
          instructions: '1) Spread the peanut butter on one piece of bread. \n2)Spread the jelly on the other side. \n3)Put the two pieces of bread together to form a sandwich. \n4) Toddler adaptation: cut off crusts before serving.',
          category: 'snacks',
          picture_url: 'https://img.sndimg.com/food/image/upload/c_thumb,q_80,w_596,h_335/v1/img/recipes/24/39/65/picIDMFir.jpg'
        },
      ]
 
      return knex('recipes')
      .insert(recipes)
      .then(() => console.log("\n== Seed data for recipes table added. ==\n"));
};
