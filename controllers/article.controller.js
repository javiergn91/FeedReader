const Article = require("../models/article");
const articleController = {};

articleController.createArticle = (data) => {
    const article = new Article({
        title: data.title,
        author: data.author,
        creation_date: data.creation_date,
        object_id: data.object_id,
        url: data.url
    });

    article.save((err) => {
        console.log(err);
    });
};

articleController.getArticles = (func) => {
    Article.find({ hidden: false }).then(data => {
        func(data);
    });
};

articleController.deleteArticle = (articleId, func) => {
    Article.findById(articleId, (err, article) => {
        article.hidden = true;
        article.save(() => {
            func();
        });
    });
};

module.exports = articleController;