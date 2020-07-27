

<h1 align="center">  Secret Family Recipes: back-end </h1>

 <h4 align='center'> Endpoints,  Routes and more CheatSheet: </h4>

---

<br></br>

**Base_url :** https://bw-secret-family-recipes-1.herokuapp.com/

<br></br>

##  Auth Routes
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

## Not Restricted YET but will be later:
---
##### (_will require token once resitrced to gain access_)

<br></br>

## Users

(in progress)

<br></br>

## Recipes
| Method  | Type     | Endpoint | Send | Return (*front-end access*)|
| ------- | -------- | -------- | ---- | ------ |
| GET   | get all recipes | api/recipes | N/A | Array of all Recipes: `res.data`|


### Recipe Info:

| Input | Required | Type |
|--|--|--|
| user_id | yes | integer |
| title | yes | string |
| source | yes | string |
| ingredients | yes | text |
| instructions | yes | text |
| category | yes | string |
| picture_url | no | string |

 ###### **_*note:_** _I will try to auto implement the user_id for the front-end_ 