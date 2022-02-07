const Recipes = require('../model/recipe_schema');
const Reviews = require('../model/review_schema');
const multer = require("multer");
const express = require("express");



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


//showing the recipe details by ID
const recDetails = (req, res) => {
    Recipes.findById(req.params.id).then(result => {
        if (result) {

            console.log(result.id)

            Reviews.find({
                'recipe_id': result.id
            }).then(yes => {
                res.render("recipe", {
                    title: "Recipe",
                    rec: result,
                    therevs: yes

                })
            })

        }
    }).catch(err => console.log(err));
}


//saving a review on a particular recipe
const saveReview = (req, res) => {
    const recipid = req.params.recid;
    console.log(recipid);

    const newRev = new Reviews(req.body)
    newRev.save().then(results => {
        res.redirect(`/recipe/${recipid}`);
    })
}

//chef's details
const profDetails = (req, res) => {
    Recipes.findById(req.params.id).then(result => {
        if (result) {

            console.log(result.full_name);
            Recipes.find({
                'full_name': result.full_name
            }).then(success => {
                res.render("profile", {
                    title: "Profile",
                    rec: result,
                    chefrec: success

                })
            })


        }
    }).catch(err => console.log(err));
}


//for returning the newly added recipes on the homepage

// const homeDetails = (req, res) => {
//     Recipes.find(req.params.id).then(result => {
//         if (result) {
//             res.render("home", {
//                 title: "Home",
//                 rec: result
//             })
//         }
//     }).catch(err => console.log(err));
// }



//for returning the 4 top rated recipes on the homepage
const homeDetails = (req, res) => {
    Reviews.find({
        'rating': 5
    }).then(great => {
        if (great) {
            console.log(great)
          return great.filter(top => {
               console.log(top.recipe_id)
            Recipes.find({'_id': top.recipe_id}).then(result => {
                if(result){
                    console.log(result)
                    res.render("home", {
                        title: "Home",
                        rec: result
                    })
                }
            })
           })           

        }
    }).catch(err => console.log(err));
}


//searching using dot then
// const searchDetails = (req, res) => {
//     const searchtag = req.params.tag;

//     console.log(searchtag);

//     Recipes.find({ $text: { $search: `${searchtag}`, $caseSensitive: false }}).then(result => {
//         if(result){
//            console.log(result)
//             res.render("searchresults", {found: result});
//         }
//     }).catch(err => console.log(err));


// }


//searching using exec function
const searchDetails = (req, res) => {
    const searchtag = req.params.tag;

    console.log(searchtag);

    Recipes.find({
        $text: {
            $search: `${searchtag}`,
            $caseSensitive: false
        }
    }).exec(function (err, result) {
        if (err) throw err
        if (result) {
            console.log(result)
            res.render("searchresults", {
                found: result
            });
        }
    })


}



//viewing all saved recipes
const allRecs = (req, res) => {
    Recipes.find(req.params.id).sort([
        ["recipe_name", 1]
    ]).then(result => {
        if (result) {
            res.render("allrecipes", {
                title: "All Recipes",
                allrec: result
            })
        }
    }).catch(err => console.log(err));
}


//viewing recipes by category
const catDetails = (req, res) => {

    const cname = req.params.catname;

    console.log(cname);

    Recipes.find({
        'category': cname
    }).then(result => {
        if (result) {

            res.render("category", {
                cat: result,
                categ: cname
            });
        }
    }).catch(err => console.log(err));


}




module.exports = {
    saveRecipe,
    recDetails,
    profDetails,
    homeDetails,
    catDetails,
    allRecs,
    searchDetails,
    saveReview

}