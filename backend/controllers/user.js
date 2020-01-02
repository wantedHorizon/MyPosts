const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser =  (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then( hash => {
        const user = new  User({
            email: req.body.email,
            password: hash
    
        });
        user.save()
        .then( result => {
            res.status(201).json({
                message:'User created successfuly!',
                result: result
            });
        })
        .catch( err => {
            res.status(500).json(
                {
                    message: "Invalid autenticaion credentials!"
                }
                
            );
        });

    });
    
}


exports.userLogin =  (req, res, next) => {
    let fetchedUser;
    User.findOne({email: req.body.email})
    .then(user => {
        
        if(!user){
            return res.status(401).json({
                message:"Autenticaion failed: plz Sign-up first"
            });
        }
        fetchedUser = user;
        return bcrypt.compare(req.body.password, user.password)
    })
    .then( result => {
        
        if( !result){
            return res.status(401).json({
                message:"Autenticaion failed: Invalid password"
            });
        }
        //here we know we have a valid user 
        const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id}, 'secret_this_should_be_very_long', {expiresIn: "1h"});
        res.status(200).json({
            token: token,
            expiresIn: 3600,
            userId: fetchedUser._id
        });



    })
    .catch(err => {
        return res.status(401).json({
            message:"Invalid autenticaion credentials!"
        });
    });
}