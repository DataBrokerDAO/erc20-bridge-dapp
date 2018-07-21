const express = require('express');
const request = require('request');
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json());

app.use('*', function (req, res) {
    delete req.headers.origin;
    delete req.headers.referer;
    delete req.headers.host;

    // console.log(req.body)
    // console.log(req.body)
    const options = {
        method: req.method,
        headers: req.headers,
        body: JSON.stringify(req.body)
    }
    request("https://mintnet.settlemint.com/" + req.url, options, function (err, response, body) {
        if (err) {
            console.log(err)
            return
        }

        res.status(response.statusCode);
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, accept')
        res.send(body);
    });
});

app.on('error', console.error)

app.listen(7545);
