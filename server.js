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
            text: {
                text: [speech]
            }
        }],
        source: "basic-nodejs"
    });

});

restService.post("/shoppe", function (req, res) {
    var speech = "";
    //var speech = req.body.queryResult && req.body.queryResult.parameters && req.body.queryResult.parameters.orderstatus ? OrderStatus : "You don't have any active orders in your list";

    if (req.body.queryResult.parameters.welcome) {
        speech = "Hello, PV. Do you have a question about your recent order ?";
        return res.json({
            fulfillmentText: speech,
            fulfillmentMessages: [{
                text: {
                    text: [speech]
                }
            }],
            source: "basic-nodejs"
        });
    } else if (req.body.queryResult.parameters.orderstatus) {
        speech = "see that your Nest is out for delivery, so it should arrive today.";
        return res.json({
            fulfillmentText: speech,
            fulfillmentMessages: [{
                text: {
                    text: [speech]
                }
            }],
            source: "basic-nodejs"
        });
    } else {
        speech = "Sorry You don't have any active orders in your list";
        return res.json({
            fulfillmentText: speech,
            fulfillmentMessages: [{
                text: {
                    text: [speech]
                }
            }],
            source: "basic-nodejs"
        });

    }
});

restService.listen(process.env.PORT || 8000, function () {
    console.log("Server up and listening");
});