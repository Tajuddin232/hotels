const express = require("express");
const app = express();
const db = require('./db/db.js');
const menuItem = require('./models/Menu.js');
const PersonRoute = require('./routes/personRoute.js');
const MenuRoute = require('./routes/menuItemRoute.js');

const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use("/person",PersonRoute);
app.use("/getItem",MenuRoute);


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});