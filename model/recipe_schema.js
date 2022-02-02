const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

const RecipeSchema = new Schema({
    recipe_name: {
        type: String,
        // required: true,
        text: true
    },
    origin: {
        type: String,
        text: true
    },
    category: {
        type: String,
        text: true
    },
    full_name: {
        type: String,
        text: true
    },
    email: {
        type: String,
        text: true
    },
    address: {
        type: String,
        text: true
    },
    bio: {
        type: String,
        text: true
    },
    ingredients: {
        type: String,
        text: true
    },
    recipe: {
        type: String,
        text: true
    },
    recipe_img: {
        type: String,
        text: true
    },
    profile_pic: {
        type: String,
        text: true
    }
})

// RecipeSchema.set('autoIndex', false);

const Recipes = mongoose.model("Recipes", RecipeSchema)

module.exports = Recipes;