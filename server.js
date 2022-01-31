const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const multer = require('multer');
const path = require('path');
const recipeController = require('./controllers/recipeController.js');
const { find } = require('./model/recipe_schema.js');

const app = express();
const PORT = process.env.PORT || 7113


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.set('view engine', "ejs");

const mongoURL = process.env.mongoURL;

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(result => {
    if(result)
    console.log("connected to mongo: success!!")
}).catch(err => {
    console.log(err);
})


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = file.originalname
        cb(null, uniqueSuffix)
    }
})

const upload = multer({
    storage
})



app.get('/', recipeController.homeDetails )

app.get('/new-recipe', (req, res) => {
    res.render("new-recipe");
})

app.get('/all-recipes', recipeController.allRecs);

app.get('/recipe/:id', recipeController.recDetails);


app.get('/profile/:id',  recipeController.profDetails);

app.get('/category/:catname', recipeController.catDetails);

app.post('/newrec', upload.array('imgUpload', 2), recipeController.saveRecipe);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`) )