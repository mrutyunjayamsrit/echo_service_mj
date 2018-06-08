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
    var speech = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.echoText ? req.body.queryResult.parameters.echoText : "Something went wrong boss.";

    return res.json({
        fulfillmentText: speech,
        fulfillmentMessages: [{
            text: speech
        }],
        source: "basic-nodejs"
    });

});

restService.listen(process.env.PORT || 8000, function () {
    console.log("Server up and listening");
});