const https = require("https");
const ArticleController = require("./controllers/article.controller");

const databasePopulation = {};

databasePopulation.populate = () => {
    https.get("https://hn.algolia.com/api/v1/search_by_date?query=nodejs", (res) => {

        let body = "";

        res.on("data", (d) => {
            body += d;
        });

        res.on("end", () => {
            let data = JSON.parse(body);

            data.hits.forEach((article) => {
                let creationDate = article.created_at;
                let storyTitle = null;
                let url = null;
                let author = article.author;
                let objectId = article.objectID;

                if(article.story_title != null) {
                    storyTitle = article.story_title;
                } else if(article.title != null) {
                    storyTitle = article.title;
                }

                if(article.url != null) {
                    url = article.url;
                } else if(article.story_url != null) {
                    url = article.story_url;
                }

                if(storyTitle != null) {
                    ArticleController.createArticle({
                        title: storyTitle,
                        author: author,
                        creation_date: creationDate,
                        object_id: objectId,
                        url: url
                    });             
                }
            });
        });
    });
};



module.exports = databasePopulation;