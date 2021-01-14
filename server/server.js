const express = require('express');
const routes = require('./routes');
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const port = process.env.PORT || 5000;

app.use(routes);

app.listen(port, () => console.log(`Listening on port ${port}`));