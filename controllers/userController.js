const Users = require('../model/user_schema');
const cookieParser = require("cookie-parser");
const { handleErrors, generateToken, deleteToken } = require('../handlers/user_handler');
const bcrypt = require('bcrypt');
const express = require("express");

// console.log(generateToken('ashs'))

const signUp = async (req, res) => {

    const { firstname, lastname, email, username, password } = req.body;

    try{
        const newUser = new Users({
            firstname, lastname, email, username, password
        });

        const user = await newUser.save();
        const token = generateToken(user._id);
        res.cookie('jwt', token, {maxAge : 1 * 24 * 60 *60, httpOnly: true });
        res.status(201).json({user: user._id});

    } catch(error){
        const errors = handleErrors(error)
        res.json({errors})
    }

}

const logIn = async (req, res) => {

    const { email, password } = req.body;

    try{

        const user = await Users.findOne({ email });

        if(user){
            const isSame = await bcrypt.compare(password, user.password);
    
            if (isSame){
                const token = generateToken(user._id);
    
                res.cookie("jwt", token, {maxAge: 3 * 24 * 60 * 60, httpOnly: true});
    
                res.status(200).json({user: user._id})
            }  else{
                res.json({ errors: "Incorrect password"})
            }
    
        } else {
            res.json({errors: "Email does not exist. Please Sign-Up"})
        }

        
        
    } catch (error){
        const errors = handleErrors(error);
        console.log(errors)
        res.json({errors});
    }


}

const logOut = (req, res) => {
   
    try{

        const userlogout =  Users.findById(req.params.id)

        if(userlogout){
            const tokn = deleteToken(userlogout._id)
            res.cookie('jwt', tokn, {maxAge: 0, httpOnly: true});
            res.redirect('/')
        }
       
    }
    catch(err){
    console.log(err)
    }
   
}


module.exports = {
    signUp,
    logIn,
    logOut
}