const Course = require('../models/Course');
const {multipleMongooseToObject, mongooseToObject} = require('../../util/mongoose');


class CourseController{
    index(req, res, next){
        Course.find()
        .then(courses => {
            res.render('courses', {courses: multipleMongooseToObject(courses)})
        })
        .catch(next);
    }
    //[GET]/courses/:slug
    show(req, res, next){
        Course.findOne({slug: req.params.slug}, function(err, course){
            if(!err)
                res.render('courses/show', mongooseToObject(course))
            else
                return;
        });
    }

    //[GET]/courses/create
    create(req, res, next){
        res.render('courses/create');
    }
    
    //[POST]/courses/store
    store(req, res, next){
        const course = new Course(req.body);
        course.save(function (err) {
            if (err) return handleError(err);
            // saved!
            res.redirect('/me/stored/courses');
        });

    }
    //[GET]/courses/:id/edit
    edit(req, res, next){
        Course.findById({_id: req.params.id}, function(err, course){
            if(!err)
                res.render('courses/edit', mongooseToObject(course));
            else
                return;
        })
    }
    
    //[PUT]/courses/:id
    update(req, res, next){
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

    //[DELETE]/courses/:id
    delete(req, res, next){
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[DELETE]/courses/:id/force
    forceDelete(req, res, next){
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }
    //[PATCH]/courses/:id/restore
    restore(req, res, next){
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next);
    }

    //[POST]/courses/handle-form-actions
    handleFormAction(req, res, next){
        switch(req.body.actions){
            case 'delete':
                var courseIds = req.body.courseIds;
                courseIds.forEach(_id => {
                    Course.delete({_id: _id})
                    .then(() => res.redirect('back'))
                    .catch(next);
                });
                break;
            default:
                res.json({message: 'Action is invalid!!!'});
        }
    }
}
module.exports = new CourseController;
