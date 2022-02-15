const jwt = require("jsonwebtoken");
const Users = require('../model/user_schema');

module.exports.authUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                console.log(err);
                res.redirect('/login');
            } else {
                console.log(decoded)
                next();
            }
        })
    } else {
        res.redirect('/login');
    }
}

module.exports.getUser = (req, res, next) => {
const token = req.cookies.jwt;

if(token){
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
        if(err){
            console.log(err);
            res.locals.user = null;
            next();
        } else{
            console.log(decoded);
            const user = await Users.findById(decoded.id);
            res.locals.user = user;
            next()
        }
    })

} else{
    res.locals.user = null;
    next()
}

}






