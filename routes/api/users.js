//Authentication
const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateCreateInput = require('../../utils/create');
const validateLoginInput = require('../../utils/login');

// Load Model
const User = require("../../models/User");

// @route POST api/users/create
// @desc Create user
// @access public

router.post('/create', (req, res) => {
    console.log(req.body);

    const { errors, isValid } = validateCreateInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors)
    }

    // User.findOne({ email: req.body.email })
    const emailRequest = req.body.email;
    const usernameRequest = req.body.username;

    User.findOne({$or: [{email: emailRequest}, {username: usernameRequest}]}).then(user => {
        if (user) {
            if(user.email === emailRequest) {
                errors.email = 'Email already exists';
            }
            if(user.username === usernameRequest) {
                errors.username = 'Oh noes! that username is already taken';
            }
            return res.status(400).json(errors);
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: '200', // Size
                r: 'pg', // Rating
                d: 'mm' // Default
            });

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});


// @route POST api/users/login
// @desc Login user
// @access public

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user){
                errors.email = 'User not found';
                return res.status(404).json(errors)
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // res.json({msg: 'match!'})
                        const payload = { id: user.id, username: user.username, avatar: user.avatar };
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 86400 }, (err, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            });
                        });

                    } else {
                        errors.password = 'Password incorrect';
                        return res.status(400).json(errors);
                    }
                })
        })
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.username,
            email: req.user.email
        });
    }
);

module.exports = router;