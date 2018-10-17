const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const passport = require('passport');

// Load Models
const Event = require("../../models/Event");


// TODO: user can track events he/she likes.

// @route GET api/events
// @desc profile

router.get('/', (req, res) => res.json({
    msg: 'It works!!!!!!'
}))

module.exports = router;