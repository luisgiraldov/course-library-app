'use strict';

const express = require('express');
const { check, body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const models = require('../models');
const { User, Course } = models;
const { Op } = require('sequelize');
const router = express.Router();
const { asyncHandler, authenticateUser, createToken, verifyAuth} = require('../middlewares');

router.get('/users', asyncHandler(async (req, res, next) => {
    //Authenticate the user before displaying it
    // await authenticateUser(req, res, next);
    await verifyAuth(req, res, next);
    //retrieve the user
    const user = req.currentUser;
    if(user) {
      const token = createToken(user.id);
      // Set the cookie with the jwt (maxAge is One day in milliseconds, thats the format needed on cookies) and send it to the browser
      //It should have secure attribute set to true and samesite, but for this dev environment we will leave it without it
      res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
      res.status(200).json({
                id: user.id,
                username: user.emailAddress,
                firstName: user.firstName,
                lastName: user.lastName
              });
    }
 })
);

// Route that creates a new user.
router.post('/users', [
  check('firstName')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "firstName"'),
  body('firstName')
    .trim()
    .escape(),
  check('lastName')
    .exists({ checkNull: true, checkFalsy: true})
    .withMessage('Please provide a value for "lastName"'),
  body('lastName')
    .trim()
    .escape(),
  check('emailAddress')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "emailAddress"'),
  body('emailAddress')
    .isEmail()
    .withMessage('Please provide a valid email address'),
  check('password')
    .exists({ checkNull: true, checkFalsy: true })
    .withMessage('Please provide a value for "password"'),
  check('password')
    .isLength({min: 8, max: undefined})
    .withMessage('Password must be 8 characters long or more')
], (req, res, next) => {
  
  // Attempt to get the validation result from the Request object.
  const errors = validationResult(req);
  // If there are validation errors...
  if (!errors.isEmpty()) {
    // Use the Array `map()` method to get a list of error messages.
    const errorMessages = errors.array().map(error => error.msg);
    // Return the validation errors to the client.
    return res.status(400).json({ errors: errorMessages });
  }

  // Get the user from the request body.
  const user = req.body;

  //Generate Salt
  const salt = bcryptjs.genSaltSync(10);

  // Hash the new user's password.
  //to implement the hash and salt, go to https://github.com/dcodeIO/bcrypt.js
  user.password = bcryptjs.hashSync(user.password, salt);

  // Add the user to the database.
  (asyncHandler( async (req, res, next) => {
    let newUser;
    try{
      newUser = await User.create({
        firstName: user.firstName,
        lastName: user.lastName,
        emailAddress: user.emailAddress.toLowerCase(),
        password: user.password,
        salt,
      }).then( data => {
        const token = createToken(data.id);
        // Set the cookie with the jwt (maxAge is One day in milliseconds, thats the format needed on cookies) and send it to the browser
        //It should have secure attribute set to true and samesite, but for this dev environment we will leave it without it
        res.cookie('jwt', token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        // Set the status to 201 Created and end the response.
        res.status(201)
        .location('/')
        .send({ token })
        .end();
      });
    } catch(error){
      if(error.name === "SequelizeValidationError") {
        const err = new Error(error.errors);
        err.status = 400;
        next(err);
      } else if(error.errors && error.errors[0].type === "unique violation"){
          const err = new Error("There is a user associated to this email address!");
          err.status = 409;
          next(err);
      } else {
            throw error;
        } 
    }
  }))(req, res, next);
});

router.get('/signout', asyncHandler( async(req, res, next) => {
    //Reset the jwt stored in the browser to logout the user, setting the cookie to be empty and a maxAge of 1 millisecond
    res.cookie('jwt', '', { maxAge: 1 }).send();
  })
);

module.exports = router;