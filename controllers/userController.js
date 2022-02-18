const Users = require('../model/user_schema');
const cookieParser = require("cookie-parser");
const { handleErrors, generateToken, deleteToken } = require('../handlers/user_handler');
const bcrypt = require('bcrypt');
const multer = require("multer");
const express = require("express");

// console.log(generateToken('ashs'))

const signUp = async (req, res) => {
    // console.log(req.file);

    const { fullname, address, username, bio, email, password } = req.body;

  //  const userImg = { fullname, address, username, bio, email, password, profile_pic: req.file.name }

    try{
        const newUser = new Users(req.body);

        const user = await newUser.save();
        const token = generateToken(user._id);
        res.cookie('jwt', token, {maxAge : 3 * 24 * 60 *60 * 1000, httpOnly: true });
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
    
                res.cookie("jwt", token, {maxAge: 3 * 24 * 60 * 1000, httpOnly: true});
    
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

const addProfPic = (req, res) =>{
    console.log(req.file)

    try{
        const uid = req.params.id
        console.log(uid)

        // const fname = req.params.pic

        const thepic = {
            profile_pic: req.file.originalname
        }
    
        Users.findByIdAndUpdate(uid, thepic).then(result => {
            console.log('profile pic added successfully')
            res.redirect(`/profile/${uid}`);
        })

    }
    catch(err){
        console.log(err)
    }

   
}


module.exports = {
    signUp,
    logIn,
    logOut,
    addProfPic
}