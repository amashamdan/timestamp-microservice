var express = require("express");
var app = express();
var months = ["January", "Febreuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/:dateString", function(req, res) {
    if (Number(req.params.dateString)) {    
        var dateString = new Date(Number(req.params.dateString));
    } else {
        var dateString = new Date(req.params.dateString)
    }
    var timeJSON = {};
    if (dateString == "Invalid Date") {
        timeJSON = {"Unix": null, "Natural": null};
        res.send(timeJSON);
        res.end();
        return;
    }
    var year, month, date;
    if (Number(req.params.dateString) || req.params.dateString == 0) {
        dateString = new Date(Number(req.params.dateString) * 1000 + 28800000);
        date = dateString.getDate();
        timeJSON.Unix = req.params.dateString;
    } else {
        // entry is string
        date = dateString.getDate();
        timeJSON.Unix = (dateString.getTime() - 28800000) / 1000;
    } 
    year = dateString.getYear() + 1900;
    month = months[dateString.getMonth()];
    timeJSON.Natural = month + " " + date + ", " + year;
    res.send(timeJSON);
    res.end();
});

app.listen(8080);