const express = require("express");
const OS = require('opensubtitles.com');
const app = express();
require('dotenv').config();

const os = new OS({
    apikey: process.env.OPENSUBTITLES_API_KEY,
    useragent: process.env.OPENSUBTITLES_USER_AGENT
});

let token = null;
const port = process.env.PORT || 3000;

app.get("/search", (req, res) => {
    
    let query = req.body.query;
    os.search({
        query: query,
        sublanguageid: "eng"
    }).then(subtitles => {
        res.send(subtitles);
    }).catch(err => {
        res.send(err);
    });
});

app.get("/login", (req, res) => {
    os.login({
        username: process.env.OPENSUBTITLES_USERNAME,
        password: process.env.OPENSUBTITLES_PASSWORD
    }).then(res => {
        res.send(res);
        token = res.token;
    }).catch(err => {
        res.send(err);
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