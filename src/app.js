require('dotenv').config();
const request = require("request");

const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended:true}));

const PORT = 3000; 
const MYAPIKEY = process.env.MYAPIKEY
const APIKEYSTRING = "&key="
const URL = "https://www.googleapis.com/books/v1/volumes?q=isbn:"

app.get("/url", (req, res) => {
    res.json(["Red", "Green", "Blue"]);
});

app.post("/url", (req, res) => {
    console.log(req.body);
    req.body.test1 = "just testing...";
    res.json(req.body);
    console.log(req.body.test1);
});

app.post("/isbn", (req, res) => {
    console.log(req.body);
    request( URL + req.body.isbn + APIKEYSTRING + MYAPIKEY, function(error,response, body) {
        if (!error && response.statusCode == 200) {
            var answer = JSON.parse(body)
            console.log(answer.totalItems);
            res.json(answer.items[0]);
            
        }

    } );

});

app.listen(PORT, () => {
    console.log("server running on port 3000");
})