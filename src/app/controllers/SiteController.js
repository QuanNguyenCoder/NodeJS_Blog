const Course = require('../models/Course');
const {multipleMongooseToObject, mongooseToObject} = require('../../util/mongoose');


class SiteController {

    index(req, res, next){
        // Course.find({}, (err, courses) => {
        //     if(!err){
        //         res.json(courses);
        //         return;
        //     }
        //     next(err);
        // })
       res.render('home');
    }
     

    search(req, res){
        res.render('search');
    }
}

module.exports = new SiteController;