
class NewController{

    //[GET]/news
    index(req, res){
        res.render('news');
    }

    //[GET]/:slug
    show(req, res){
        res.send('Detailed of news');
    }
}

module.exports = new NewController;
