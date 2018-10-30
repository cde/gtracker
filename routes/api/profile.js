const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Models
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// Validations
const validateProfileInput = require('../../utils/profile');
const validateExperienceInput = require('../../utils/experience');


// *** PROFILE ***

// *** GET requests ****
// @route GET api/profile
// @desc Get current user profile
// @access Private

router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {};
        console.log(req.user.id );
        Profile.findOne({ user: req.user.id })
            .populate('user', ['username', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noProfile = 'There is no profile for this user';
                    return res.status(404).json(errors);
                }
                res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route GET api/profile/username/:username
// @desc Get profile by username
// @access Public

router.get('/username/:username', (req, res) => {
    console.log(req.params);
    Profile.findOne({ username: req.params.username })
        .populate('user', ['username', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noProfile = "There is no profile for this username";
                res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err));

    }
);

// @route GET api/profile/user/:user_id
// @desc Get profile by user ID
// @access Public

router.get('/user/:user_id', (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['username', 'avatar'])
        .then(profile => {
            if(!profile) {
                errors.noProfile = "There are no profiles";
                res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err));
    }
);


// @route GET api/profile/all
// @desc Get profiles
// @access Public

router.get('/all', (req, res) => {
        Profile.find({})
            .populate('user', ['username', 'avatar'])
            .then(profile => {
                if(!profile) {
                    errors.noProfile = "There is no profile for this username";
                    res.status(404).json(errors)
                }
                res.json(profile)
            })
            .catch(err => res.status(404).json(err));
    }
);

// *** POST request ***

// @route POST
// @desc POST create profile
// @access Private

router.post('/', passport.authenticate('jwt', { session: false}),
    (req, res) => {
        console.log('1) create-profile => ', req.body);
        const { errors, isValid } = validateProfileInput(req.body);

        // Check Validation
        if (!isValid) {
            return res.status(400).json(errors);
        }

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        profileFields.username = req.user.username;
        if (req.body.full_name) profileFields.fullName = req.body.full_name;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.githubusername)
            profileFields.githubusername = req.body.githubusername;

        // Skills - Split into array
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',');
        }

        // Social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

        console.log('2) profileFields => ', profileFields);
        Profile.findOne({ user: req.user.id }).then(profile => {
            if(profile) {
                Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true})
                    .then(profile => res.json(profile))
            } else {
                Profile.findOne({ username: profileFields.username }).then(profile => {
                    if(profile) {
                        errors.username = 'Username already exists';
                        res.status(400).json(errors);
                    }
                    new Profile(profileFields).save().then(profile => res.json(profile));
                })
            }
        })

    }
);


router.post('/social', passport.authenticate('jwt', { session: false}),
    (req, res) => {
        const profileFields = {};
        profileFields.user = req.user.id;
        profileFields.username = req.user.username;

        // Social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

        console.log('profileFields ', profileFields);
        Profile.findOne({ user: req.user.id }).then(profile => {
            if(profile) {
                Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true})
                    .then(profile => res.json(profile))
            } else {
                Profile.findOne({ username: profileFields.username }).then(profile => {
                    if(profile) {
                        errors.username = 'Username already exists';
                        res.status(400).json(errors);
                    }
                    new Profile(profileFields).save().then(profile => res.json(profile));
                })
            }
        })

    }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOneAndRemove({ user: req.user.id }).then(() => {
            User.findOneAndRemove({ _id: req.user.id }).then(() =>
                res.json({ success: true })
            );
        });
    }
);

// *** EXPERIENCE ***

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private

router.post('/experience', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        console.log(req.body)

        const { errors, isValid } = validateExperienceInput(req.body);

        // Check Validation
        if (!isValid) {
            // Return any errors with 400 status
            return res.status(400).json(errors);
        }

        Profile.findOne({ user: req.user.id }).then(profile => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current,
                description: req.body.description
            };

            // Add to exp array
            profile.experience.unshift(newExp);

            profile.save().then(profile => res.json(profile));
        });
    }
);

// @route   DELETE api/profile/experience/:experience_id
// @desc    Delete experience from profile
// @access  Private

router.delete('/experience/:experience_id', passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then(profile => {

            const removeIndex = profile.experience;
            console.log(removeIndex);
            removeIndex
                .map(item => item.id)
                .indexOf(req.params.experience_id)
            profile.save()
                .then(profile => res.json(profile))

        })
        .catch(err => res.json(err));
    }
);


// *** EDUCATION ***

// @route   POST api/profile/education
// @desc    Add education to profile
// @access  Private

router.post('/education', passport.authenticate('jwt', { session: false }),
    (req, res) => {

        Profile.findOne({ user: req.user.id }).then(profile => {
            const newEducation = {
                school: req.body.school,
                degree: req.body.degree,
                fieldOfStudy: req.body.fieldOfStudy,
                from: req.body.from,
                to: req.body.to,
                current: req.body.current
            };

            // Add to exp array
            profile.education.unshift(newEducation);

            profile.save().then(profile => res.json(profile));
        });
    }
);


router.delete('/education/:education_id', passport.authenticate('jwt', { session: false }),
    (req, res) => {

        Profile.findOne({ user: req.user.id })
            .then(profile => {
                // Get remove index
                const removeIndex = profile.education
                    .map(item => item.id)
                    .indexOf(req.params.education_id);

                // Splice out of array
                profile.education.splice(removeIndex, 1);

                // Save
                profile.save().then(profile => res.json(profile));
            })
            .catch(err => res.status(404).json(err));
    }
);

module.exports = router;