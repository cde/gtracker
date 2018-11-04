const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PopularToolSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String

    },
    platform: {
        type: String,
        required: true

    }
});

const PopularTool = mongoose.model('profiles', PopularToolSchema);
module.exports = PopularTool;
