const express = require("express");
const path = require("path");
const cron = require("node-cron");
const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//Fetching data from API
cron.schedule("* * * * *", () => {
    console.log("Fetching data...");
});

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(3000);

