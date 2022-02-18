const jwt = require("jsonwebtoken");

module.exports.handleErrors = (err) => {

    let errors = { fullname:"", address:"", username:"", bio:"", email:"", password:"" };
    console.log(err)
    if (err.code === 11000) {
        errors.email = "Email already exists. Please Login";
        errors.username = "Username already exists. Please try again";
      }

    if(err.message.includes("User validation failed")){
        Object.values(err.errors).forEach((pop) => {
            if(pop.path === "fullname"){
                errors.fullname = pop.message
            }
            if(pop.path === "address"){
                errors.address = pop.message
            }
            if(pop.path === "username"){
                errors.username = pop.message
            }
            if(pop.path === "bio"){
                errors.bio = pop.message
            }
            if(pop.path === "email"){
                errors.email = pop.message
            }
            
            if(pop.path === "password"){
                errors.password = pop.message
            }
            
            
        })
    }
    return errors;

}

module.exports.generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 3 * 24 * 60 * 60 * 1000
    });
};

module.exports.deleteToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: 0 * 1000
    }); 
}