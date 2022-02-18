const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const RecipeSchema = new Schema({
    recipe_name: String,
    origin: String,
    category: String,
    full_name: String,
    email: String,
    address: String,
    bio: String,
    ingredients:String,
    recipe: String,
    user_id: String,
    recipe_img:String
})

//you were adding a user_id to the recipe schema and add new recipe form


RecipeSchema.index({'$**': 'text'});



const Recipes = mongoose.model("Recipes", RecipeSchema)

module.exports = Recipes;