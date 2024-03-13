const express = require("express");
const OS = require('opensubtitles.com');
const app = express();
require('dotenv').config();

const os = new OS({
    apikey: process.env.OPENSUBTITLES_API_KEY,
});

let token = null;
const port = process.env.PORT || 3000;



app.get("/search", (req, res) => {
    os.search({
        query: "see you again",
        sublanguageid: "eng"
    }).then(subtitles => {
        res.send(subtitles);
    }).catch(err => {
        res.send(err);
    });
});

app.get("/login", (req, res) => {
    // send post request to "https://api.opensubtitles.com/api/v1/login" with the api key in the header and uesrname and password in the body
    fetch("https://api.opensubtitles.com/api/v1/login", {
        method: "POST",
        headers: {
            "Api-Key": process.env.OPENSUBTITLES_API_KEY,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: "username",
            password: "password",
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            token = data.token;
            // os.token = token;
            res.send(data);
        })
        .catch((error) => {
            res.send(error);
        });
});

app.get("/logout", (req, res) => {
    os.logout(token).then(res => {
        res.send(res);
    }).catch(err => {
        res.send(err);
    });
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});