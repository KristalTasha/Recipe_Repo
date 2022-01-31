const Recipes = require('../model/recipe_schema');
const multer = require("multer");
const express = require("express");


// const homePage = (req, res) => {
//     res.render("home")
// }

const saveRecipe = (req, res) => {
    console.log(req.files);

    const {
        recipe_name,
        origin,
        category,
        full_name,
        email,
        address,
        bio,
        ingredients,
        recipe
    } = req.body;

    const addImgs = {
        recipe_name,
        origin,
        category,
        full_name,
        email,
        address,
        bio,
        ingredients,
        recipe,
        recipe_img: req.files[0].originalname,
        profile_pic: req.files[1].originalname
    }


    const recField = new Recipes(addImgs)
    recField.save().then(results => {
        res.redirect("/")
    }).catch(err => console.log(err))
}


const recDetails = (req, res) => {
    Recipes.findById(req.params.id).then(result => {
        if (result) {
            console.log(result)
            res.render("recipe", {
                title: "Recipe",
                rec: result
            })
        }
    }).catch(err => console.log(err));
}

const profDetails = (req, res) => {
    Recipes.findById(req.params.id).then(result => {
        if (result) {

            console.log(result.full_name);
            Recipes.find({'full_name': result.full_name}).then(success => {
                res.render("profile", {
                    title: "Profile",
                    rec: result,
                    chefrec: success
    
                })
            })

           
        }
    }).catch(err => console.log(err));
}



const homeDetails = (req, res) => {
    Recipes.find(req.params.id).then(result => {
        if (result) {
            res.render("home", {
                title: "Home",
                rec: result
            })
        }
    }).catch(err => console.log(err));
}

const allRecs = (req, res) => {
    Recipes.find(req.params.id).sort([["recipe_name", 1]]).then(result => {
        if (result) {
            res.render("allrecipes", {
                title: "All Recipes",
                allrec: result
            })
        }
    }).catch(err => console.log(err));
}



const catDetails = (req, res) => {

    const cname = req.params.catname;

    console.log(cname);

    Recipes.find({'category': cname}).then(result => {
        if(result){
            
            res.render("category", {cat: result, categ: cname});
        }
    })

    


}




module.exports = {
    saveRecipe,
    recDetails,
    profDetails,
    homeDetails,
    catDetails,
    allRecs

}