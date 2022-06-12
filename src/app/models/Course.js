const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');


const Course = new Schema({
    name: { type: String, minLength: 1, required: true, },
    description: { type: String, maxLength: 256},
    image: { type: String},
    slug: { type: String, slug: 'name', unique: true },
    videoID: {type: String},
}, {
    timestamps: true,
});

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    overrideMethods: true, 
    deletedAt: true
});

module.exports = mongoose.model('Course', Course);
