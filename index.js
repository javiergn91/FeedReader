const express = require("express");
const path = require("path");
const cron = require("node-cron");
const app = express();

//Populate database with API
const DatabasePopulate = require("./database_population");

//Data controller
const ArticleController = require("./controllers/article.controller");

//Data formatting
const FormatDate = require("./format_date");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

const { mongoose } = require("./database");

//DatabasePopulate.populate();

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
        let formattedData = [];

        data.forEach((d) => {
            d.creation_date = "A";

            formattedData.push({
                title: d.title,
                author: d.author,
                id: d.id,
                url: d.url,
                creation_date: FormatDate.format(d.creation_date)
            });
        });

        res.render("index", {
            articles: formattedData
        });
    });
});

app.get("/deleteArticle/:id", (req, res) => {
    ArticleController.deleteArticle(req.params.id, () => {
        res.render("deleteArticle");
    });
});

app.listen(3000);