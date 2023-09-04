const express = require("express");
const path = require('path');
const dt = require('./index.js');

const data = require('./public/data.json');

const app = express();

app.use(express.static('./public'));

app.get("/api", (req, res) => {
    res.json(data);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});


dt.updateAll();
console.log("First update " + new Date());

var updated;

setInterval(function() {
    dt.updateAll();
    console.log("Updated, " + new Date());
    updated = new Date();
}, 1000 * 60 * 60 * 12);
