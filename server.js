'use strict';
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const querystring = require('querystring');

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

    if (req.body.queryResult.action == 'input.welcome') {
        //speech = "Hello, PV. Do you have a question about your recent order ?";

        let option = {
            hostname:'cloudcontactcenter.googleapis.com/v1alpha1',
            port: 443,
            path: '/projects/contact-center-206218/locations/mj_shoppe/knowledgeBases',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': 'Bearer ya29.c.El_pBWrPw6OqOIPELAS-XJlnQH78Gwccpj1g1wNVUp-IM-uKexN4Cp1hOGhPuxLZGERZAGqA1SbmtKzl3jCNGGlY7zd8ZG0Yzkl1Zk9viwzN95b4JsPQhPkoSrMykYiNLA'
            }
        }

        var request = https.request(options, (res) => {
            let speechOutput = '';
            res.setEncoding('utf8')
            res.on('data', (chunk) => {
                console.log(`Got partial data ${chunk}`)
                data += chunk;

            })
            res.on('end', () => {
                console.log(`done handling request data = ${data}`)

                let ret = JSON.parse(data);

                speech = ret;

            })
        })



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