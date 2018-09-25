const express = require("express");
const path = require("path");
const cron = require("node-cron");
const app = express();

//Populate database with API
const databasePopulate = require("./database_population");

const ArticleController = require("./controllers/article.controller");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const { mongoose } = require("./database");

//databasePopulate.populate();

/*
//Fetching data from API
cron.schedule("* * * * *", () => {
    https.get("https://hn.algolia.com/api/v1/search_by_date?query=nodejs", (result) => {
        console.log(result);
    });
});
*/


app.get("/", (req, res) => {
    ArticleController.getArticles((data) => {
        res.render("index", {
            articles: data
        });
    });
});

app.listen(3000);