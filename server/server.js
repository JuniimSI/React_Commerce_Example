const express = require('express');
const routes = require('./routes');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("view engine", "ejs")


const port = process.env.PORT || 5000;

app.use(routes);

app.listen(port, () => console.log(`Listening on port ${port}`));