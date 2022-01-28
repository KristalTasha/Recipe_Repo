const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipeSchema = new Schema({
    recipe_name: {
        type: String,
        required: true
    },
    origin: String,
    category: String,
    full_name: String,
    email: String,
    address: String,
    bio: String,
    ingredients: String,
    recipe: String,
    recipe_img: String,
    profile_pic: String
})

const Recipes = mongoose.model("Recipes", RecipeSchema)

module.exports = Recipes;