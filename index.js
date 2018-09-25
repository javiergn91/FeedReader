const express = require("express");
const path = require("path");
const cron = require("node-cron");
const app = express();
const https = require("https");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const { mongoose } = require("./database");

https.get("https://hn.algolia.com/api/v1/search_by_date?query=nodejs", (res) => {

    let body = "";

    res.on("data", (d) => {
        body += d;
    });

    res.on("end", () => {
        console.log(JSON.parse(body));
    });
});

/*
//Fetching data from API
cron.schedule("* * * * *", () => {
    https.get("https://hn.algolia.com/api/v1/search_by_date?query=nodejs", (result) => {
        console.log(result);
    });
});
*/

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000);