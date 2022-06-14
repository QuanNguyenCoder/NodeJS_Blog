const mongoose = require('mongoose');

const AutoIncrement = require('mongoose-sequence')(mongoose);

const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
var mongooseDelete = require('mongoose-delete');


const Course = new Schema({
    _id: {type: Number, default: 1},
    name: { type: String, minLength: 1, required: true, },
    description: { type: String, maxLength: 256},
    image: { type: String},
    slug: { type: String, slug: 'name', unique: true },
    videoID: {type: String},
}, {
    timestamps: true,
    _id: false,
});

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    overrideMethods: true, 
    deletedAt: true
});
Course.plugin(AutoIncrement);

module.exports = mongoose.model('Course', Course);
