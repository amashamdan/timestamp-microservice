var express = require("express");
var app = express();
/* This array is used later to send the correct month's name. */
var months = ["January", "Febreuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
/* get request on root folder */
app.get("/", function(req, res) {
    /* index.html is sent and explains the app and how to use it. */
    res.sendFile(__dirname + "/index.html");
});
/* get request with a date string passed as params */
app.get("/:dateString", function(req, res) {
    /* If the string is just numbers, a date object is created after converting the string to number. */
    if (Number(req.params.dateString)) {    
        var dateString = new Date(Number(req.params.dateString));
    } else {
        /* otherwise, the date object is created directly from the string. */
        var dateString = new Date(req.params.dateString)
    }
    /* This object will be send as reponse. */
    var timeJSON = {};
    /* If the date object holds an invalid date: */
    if (dateString == "Invalid Date") {
        /* unix and natural keys are set to null and sent as response. */
        timeJSON = {"Unix": null, "Natural": null};
        res.send(timeJSON);
        res.end();
        return;
    }
    /* If the date is valid, the follwing varialbes are declared. */
    var year, month, date;
    /* If the date string is numbers only or if it is zero (for some reason 0 wasn't identified as number) */
    if (Number(req.params.dateString) || req.params.dateString == 0) {
        /* A multiplier and offset applied. */
        dateString = new Date(Number(req.params.dateString) * 1000 + 28800000);
        /* date (day number is is saved in date variable) */
        date = dateString.getDate();
        /* Unix key in the timeJSON object is set. */
        timeJSON.Unix = req.params.dateString;
    } else {
        // if entry is string
        /* date is saved. */
        date = dateString.getDate();
        /* For local host this is the working line:
        timeJSON.Unix = (dateString.getTime() - 28800000) / 1000;
        For online deployed version, the offset of 28800000 is not needed. */
        timeJSON.Unix = (dateString.getTime()) / 1000;
    } 
    /* year and month saved, getYear method gives back number of years elapsed since 1900, so offset is needed. */
    year = dateString.getYear() + 1900;
    /* month number is used as index to grab the month's name from the months array. */
    month = months[dateString.getMonth()];
    /* Natural key is set. */
    timeJSON.Natural = month + " " + date + ", " + year;
    /* response with the natural date and unix timestamo is sent to the client. */
    res.send(timeJSON);
    res.end();
});
/* port is set, 3000 in case hosted locally. */
var port = Number(process.env.PORT || 3000)
app.listen(port);