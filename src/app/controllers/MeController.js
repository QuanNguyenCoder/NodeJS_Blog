const Course = require('../models/Course');
const {multipleMongooseToObject, mongooseToObject} = require('../../util/mongoose');


class MeController{
    //[GET]/me/stored/courses
    storedCourses(req, res, next){
        Promise.all([Course.find(), Course.countDocumentsDeleted()])
            .then(([courses, deletedCount]) => {
                res.render('me/stored-courses', 
                    {
                        deletedCount,
                        courses: multipleMongooseToObject(courses)
                    }
                );
            })
            .catch(next);
    }

    //[GET]/me/trash/courses
    deletedCourses(req, res, next){
        Course.findDeleted()
            .then(courses => 
                res.render('me/trash-courses', {courses: multipleMongooseToObject(courses)}
            ))
            .catch(next)
    }
    //[POST]/me/handle-form-actions
    handleFormActions(req, res, next) {
        var courseIds = req.body.courseIds;
        switch(req.body.actions){
            case 'delete':
                courseIds.forEach(_id => {
                    Course.deleteOne({_id: _id})
                        .then(() => {
                            res.redirect('back');
                        })
                        .catch(next);
                });
                break;
            case 'restore':
                courseIds.forEach(_id => {
                    Course.restore({_id: _id})
                        .then(() => {
                            res.redirect('back');
                        })
                        .catch(next);
                });
                break;
            default:
                res.json({message: 'Action is invalid!!!!'});
        }
    }
}

module.exports = new MeController;
