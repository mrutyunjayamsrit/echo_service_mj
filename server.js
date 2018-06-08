'use strict';
const express = require("express");
const bodyParser = require("body-parser");

const restService = express();

var port = process.env.PORT || 1337;

restService.use(
    bodyParser.urlencoded({
        extended: true
    })
);


restService.use(bodyParser.json());

restService.post("/echo", function (req, res) {
    var speech = req.body.result && req.body.result.parameters && req.body.result.parameters.echoText ? req.body.result.parameters.echoText : "Something went wrong boss.";

    return res.json({
        text: speech,
        speech: speech,
        displayText: speech,
        source: "basic-nodejs"
    });

});

restService.listen(process.env.PORT || 8000, function () {
    console.log("Server up and listening");
});