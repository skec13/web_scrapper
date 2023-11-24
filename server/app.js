const express = require("express");
const path = require('path');
const dt = require('./index.js');

const data = require('./public/data.json');

//const ip = "10.187.64.103";
const port = 8080;

const app = express();

app.use(express.static('./public'));

app.get("/api", (req, res) => {
    res.json(data);
    console.log("Get request: " + new Date());
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


dt.updateAll();
console.log("First update " + new Date());

var updated;

setInterval(function() {
    dt.updateAll();
    console.log("Updated, " + new Date());
    updated = new Date();
}, 1000 * 60 * 60 * 12);
