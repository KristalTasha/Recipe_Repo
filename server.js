const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config()
const multer = require('multer');
const cookieParser = require('cookie-parser');
const path = require('path');
const recipeController = require('./controllers/recipeController.js');
const userController = require('./controllers/userController.js');
const { authUser, getUser } = require('./middleware/user_auth.js');

const app = express();

const PORT = process.env.PORT || 7113


app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());

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

// const store = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'public/uploads')
//     },
//     filename: function (req, file, cb) {
//         const uniqueSuffix = file.name
//         cb(null, uniqueSuffix)
//     }
// })

// const picupload = multer({
//     store
// })

// app.get('/set-cookie', (req, res) => {
//     res.cookie('JWT', 'KOKWOJREWOIIDD8837', {maxAge: 3*24*60*60, httpOnly: true});
//     res.json({message: "cookie set"})
// })

app.get('*', getUser);

app.get('/', recipeController.homeDetails )

app.get('/new-recipe', authUser, (req, res) => {
    res.render("new-recipe");
})

app.get('/all-recipes', recipeController.allRecs);

// app.get('/search/:tag', recipeController.searchDetails);

app.get('/search', recipeController.searchDetails);

app.get('/recipe/:id', recipeController.recDetails);

app.get('/profile/:id', recipeController.profDetails);

// app.get('/userprofile/:id', recipeController.userprofDetails);

app.get('/category/:catname', recipeController.catDetails);

// app.get('/userprofile', (req, res) => {
//     res.render("profile");
// })


//app.get('/profsearch/:prec', recipeController.profSearch);

app.get('/about', (req, res) => {
    res.render("about");
})

app.get('/contact', (req, res) => {
    res.render("contact");
})

app.get('/sign-up', (req, res) => {
    res.render("signup");
})

app.get('/login', (req, res) => {
    res.render("login");
})

app.get('/logout/:id', userController.logOut);

app.post('/newrec', upload.single('imgUpload'), recipeController.saveRecipe);

app.post('/newrev/:recid', recipeController.saveReview);

app.post('/signup', userController.signUp);

app.post('/login', userController.logIn);

app.post('/add-image/:id', upload.single('imgUpload'), userController.addProfPic);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`) )