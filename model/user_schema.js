const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const {
    Schema
} = mongoose;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "Please fill in this field"]
    },
    lastname: {
        type: String,
        required: [true, "Please fill in this field"]
    },
    email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true
    },
    username: {
        type: String,
        required: [true, "Please fill in this field"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter a password"],
        minlength: [8, "The password length be at least 8 characters"]
    }
})

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next()
})

const User = mongoose.model("User", UserSchema);

module.exports = User;