/*var http = require("http");
var url = require("url");
var server = http.createServer(function(req, res) {
    var parsedUrl = url.parse(req.url, true);
    var returned = {};
    var date = new Date(parsedUrl.query.iso);
    if (parsedUrl.pathname == "/api/parsetime") {
        returned.hour = date.getHours();
        returned.minute = date.getMinutes();
        returned.second = date.getSeconds();
    } else if (parsedUrl.pathname == "/api/unixtime") {
        returned.unixtime = date.getTime();
    } else {
        return res.end("<p>not workking</p>");
    }
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end("<p>workking</p>");
});
server.listen(8080);*/

var express = require("express");
var app = express();

app.get("/", function(req, res) {
    res.end("<p>Test by entering a url string</p>");
});

app.get("/:dateString", function(req, res) {
    var dateString = new Date(req.params.dateString);
    var timeJSON = {};
    if (dateString) {
        timeJSON.Natural = dateString;
        timeJSON.Unix = (dateString.getTime() - 28800000) / 1000;
        res.send(timeJSON);
        res.end(); 
    } else {
        var timeJSON = {"Natural": null, "Unix": null};
    }
});

app.listen(8080);