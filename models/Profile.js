const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    firstName: { type: String,  required: true },
    lastName: { type: String,  required: true },
    username: {
        type: String,
        require: true,
        max: 40
    },
    company: { type: String },
    website: { type: String },
    bio: { type: String },
    location: { type: String },
    status: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    githubUsername: {
        type: String
    },
    experience: [
        {
            title:  { type: String, required: true },
            company:  { type: String, required: true },
            location: {type: String },
            from: { type: Date },
            to: { type: Date },
            current: { type: Boolean, default: false },
            description: { type: String }
    } ],
    education: [
        {
            school:  { type: String },
            degree:  { type: String },
            fieldOfStudy:  { type: String },
            location: {type: String },
            from: { type: Date },
            to: { type: Date },
            current: { type: Boolean, default: false }
        } ],
    createAt: { type: Date, default: Date.now() }

});
const Profile = mongoose.model('profiles', ProfileSchema);
module.exports = Profile;
