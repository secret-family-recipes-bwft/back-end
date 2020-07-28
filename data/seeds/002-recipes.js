
exports.seed = function (knex) {
  // 000-cleanup.js already cleaned out all tables

const recipes = [

        {
          user_id: 1,
          title: 'Chocolate Moose',
          source: 'marta',
          category: 'dessert',
          picture_url: 'https://3.bp.blogspot.com/_g25bDp45_Kg/TFbsTko738I/AAAAAAAAy4U/gDA0MK_KOYo/s1600/choc+moose+maine.png',
          country_of_origin: 'Canada',
          prepTime: 'a long time...',
          serving_size: 10,

        },
        {
          user_id: 1,
          title: 'Punny Recipe',
          source: 'marta',
          category: 'jokes',
          picture_url: 'https://www.tasteofhome.com/wp-content/uploads/2018/02/noodledadjoke.jpg',
          serving_size: 0,
          country_of_origin: 'USA',
        },
        {
          user_id: 2,
          title: 'Ice Cubes',
          source: 'isaac',
          category: 'snacks',
          picture_url: 'https://img.sndimg.com/food/image/upload/c_thumb,q_80,w_721,h_406/v1/img/recipes/42/03/98/picqRNQfS.jpg',
          prepTime: 'few hours',
          serving_size: 1,
          country_of_origin: 'Alaska',

        },
        {
          user_id: 2,
          title: 'English Peas',
          source: 'isaac',
          category: 'dinner',
          picture_url: 'https://ugc-01.cafemomstatic.com/gen/constrain/740/1500/75/2012/09/10/18/4y/2n/phjr669s841.jpg',
          originator: 'Auntie May',
          tradition: 'Every dinner table',
          country_of_origin: 'USA',
          serving_size: 4
        },
        {
          user_id: 3,
          title: 'Elephant Stew for Big Parties',
          source: 'joe',
          category: 'dinner',
          picture_url: 'https://images-na.ssl-images-amazon.com/images/I/61HppnpX6fL._SX258_BO1,204,203,200_.jpg',
          country_of_origin:'Africa',
          serving_size: 100,
          prepTime: 'a long time....',
        },
        {
          user_id: 3,
          title: 'Peanut Butter & Jelly',
          source: 'joe',
          category: 'snacks',
          picture_url: 'https://img.sndimg.com/food/image/upload/c_thumb,q_80,w_596,h_335/v1/img/recipes/24/39/65/picIDMFir.jpg',
          originator: 'mom',
          prepTime: '10mins',
          serving_size: 2,
          tradition: 'Perfect for snacking in front of TV',
          country_of_origin: 'USA'
        },
      ]
 
      return knex('recipes')
      .insert(recipes)
      .then(() => console.log("\n== Seed data for recipes table added. ==\n"));
};
