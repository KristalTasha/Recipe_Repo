const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReviewSchema = new Schema({
    user_review: {
        type: String,
        required: true
    },
    user_name: String,
    user_address: String,
    rating: Number,
    recipe_id: String
    
})

const Reviews = mongoose.model("Reviews", ReviewSchema)

module.exports = Reviews;