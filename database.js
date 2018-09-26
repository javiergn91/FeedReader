const mongoose = require("mongoose");
const ArticleController = require("./controllers/article.controller");
const DatabasePopulation = require("./database_population");

const URI = "mongodb://localhost/feed-reader-db2";

mongoose.connect(URI)
    .then(db => {
        console.log("DB is connected")
       
        //If no articles exists, then populate automatically the db
        //Useful for first time initializations
        if(ArticleController.getArticles((data) => 
        {
            if(data.length <= 0) {
                console.log("DB auto population");
                DatabasePopulation.populate();                
            }
        }));
    })
    .catch(err => console.error(err));

module.exports = mongoose;