var express = require("express");
var app = express();
var months = ["January", "Febreuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.get("/", function(req, res) {
    res.end("<p>Test by entering a url string</p>");
});

app.get("/:dateString", function(req, res) {
    var dateString = new Date(req.params.dateString);
    var timeJSON = {};
    if (!dateString) {
        timeJSON = {"Natural": null, "Unix": null};
        res.send(timeJSON);
        res.end();
        return;
    }
    if (Number(req.params.dateString)) {
        res.send("working on number conversion");
    } else {
        // entry is string
        var year = dateString.getYear() + 1900;
        var month = months[dateString.getMonth()];
        var date = dateString.getDate();
        timeJSON.Natural = month + " " + date + ", " + year;
        timeJSON.Unix = (dateString.getTime() - 28800000) / 1000;
        res.send(timeJSON);
        res.end();
    } 
});

app.listen(8080);