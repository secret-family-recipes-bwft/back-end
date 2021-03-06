

<h1 align="center">  Secret Family Recipes: back-end </h1>

 <h4 align='center'> Endpoints,  Routes and more CheatSheet: </h4>

---

<br></br>

**Base_url :** https://bw-secret-family-recipes-1.herokuapp.com/ 

<br></br>

<h2 align="center">  Auth Routes </h2>

---

| Method  | Type     | Endpoint | Send | Return (*front-end access*)|
| ------- | -------- | -------- | ---- | ------ |
| POST    | Register | api/auth/register  | JSON with `username`, `password`, and `email` | User Data: `res.data` <br></br>Token: `res.data.token` |
| POST    | Login    | api/auth/login  | JSON with `username` and `password` | Welcome Message: `res.data.message` <br></br> Token: `res.data.token` |


###  Registration Info: 
| Input | Required | Type |
|--|--|--|
| username (unique) | yes | string |
| password | yes | string |
|email | yes | string |

 ###### **_*note:_** _you do not have to worry about the user's id. It will be autogenerated by the backend_ 


  ###### **_*note:_** _register is set up similar to login: you can access the token and login straight from the register page!_ 



###  Login Info:

| Input | Required | Type |
|--|--|--|
| username | yes | string |
| password | yes | string |

 ###### **_*note:_** _React crew: you can login with your `name` as your username and password. No need to register_ 

<br></br>

## Restricted:

##### (_require token to gain access_)
---


<br></br>

<h2 align="center">  Users </h2>

---

| Method  | Type     | Endpoint | Send | Return (*front-end access*)|
| ------- | -------- | -------- | ---- | ------ |
| GET   | get all users | api/users | N/A | Array of all Users: `res.data`|
| GET   | get user by id | api/users/:id | :id (user id)| Object with a user: `res.data`|
| GET   | get user's recipes by user id | api/users/:id/recipes | :id (user id)| Array of a user's Recipes: `res.data`|
| POST   | post new recipe for a specific user | api/users/:id/recipes | :id <br></br> Recipe info: `title`, `category`, `picture_url`(optional), `country_of_origin`(optional), `tradition`(optional),`originator`(optional), `prepTime`(optional), `serving_size`(optional) | Object with the newly created recipe `res.data`|

<br></br>

<h2 align="center">  Recipes </h2>

---

| Method  | Type     | Endpoint | Send | Return (*front-end access*)|
| ------- | -------- | -------- | ---- | ------ |
| GET   | get all recipes | api/recipes | N/A | Array of all Recipes: `res.data`|
| GET   | get recipe by id | api/recipes/:id | :id (recipe id)| Object with Recipe information (it includes the recipes ingredients, allergies, and instructions): `res.data`|
| GET   | get recipe by category | api/recipes?category=categoryName | =category <br></br> (example: api/recipes?category=dinner)  | Array with Recipes of specified category: `res.data`|
| GET   | get recent recipes | api/recipes/recent/:limit | :limit | Array of :limit number of recent recipes: `res.data`|
| POST   | post ingredients by recipe id | api/recipes/:id/ingredients | :id <br><br> ingredient info: `name`,as well as: `quantity`, and `measure` (ex: quantity: 2, measure: 'lbs') | Object with added Ingredient: `res.data` |
| POST   | post allergies by recipe id | api/recipes/:id/allergies | :id <br><br> allergy info: `type` | Object with added Allergy: `res.data` |
| POST   | post instructions by recipe id | api/recipes/:id/instructions | :id <br><br> instructions info: `step_number`, `instructions` | Object with added STEP insctructions: `res.data` |
| PUT   | update existing recipe | api/recipes/:id | :id <br><br> changes/field(s) to update | Object with updated Recipe: `res.data.updatedRecipe` and a success message: `res.data.success`|
| DELETE  | delete existing recipe | api/recipes/:id | :id  | Object with deleted Recipe: `res.data.deletedRecipe` and a success message: `res.data.success`|



### Recipe Info:

| Input | Required | Type | Notes/Tips |
|--|--|--|--|
| user_id | yes | integer | ```no need to send it in POST request; backend provides it automatically``` |
| title | yes | string | 
| source | yes | string |```no need to send it in POST request; backend provides it automatically as the user's username```|
| category | yes | string |
| picture_url | no | string | 
| country_of_origin | no | string | defaults to `unknown` |
| tradition | no | text | defaults to `'none'` |
| originator | no | string | defaults to `unknown`|
| prepTime | no | string | defaults to `'0 minutes'` |
| serving_size | no | integer | defaults to `1` |


### Ingredients Info:
| Input | Required | Type | Notes/Tips |
|--|--|--|--|
| name | yes | string | 

### Allergies Info:
| Input | Required | Type | Notes/Tips |
|--|--|--|--|
| type | yes | string | 

### Instructions Info:
| Input | Required | Type | Notes/Tips |
|--|--|--|--|
| step_number | yes | integer | 
| instructions | yes | text | `describes the step` |
| recipe_id | yes | integer | `no need to send it in POST request; backend provides it automatically` |

<br></br>

## Additional Route(s) -- (code commented out, because it was conflicting with Heroku. This route is no longer working)

##### (_ability to upload picture without typing out its whole url_)
---

<h2 align="center">  Image </h2>

---

| Method  | Type     | Endpoint | Send | Return (*front-end access*)|
| ------- | -------- | -------- | ---- | ------ |
| PUT   | upload picture for an EXISTING recipe by recipe id | api/recipes/:id/image | :id <br></br> image file as `form-data` | Object with the updated recipe nopw including the picture ulr: `res.data.recipe`|

 #### **_*note:_** _This method requires to send a file as `form-data` and creates a secure url for the file selected/uploaded_ 

 <img src='./cloudinaryMulter.jpg'>
