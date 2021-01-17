const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors')

//Deps
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs")

app.use(express.static('public'));
// Enable CORS
app.use(cors());
app.options('*', cors());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Acess-Control-Allow-Headers', '*');
//   if(req.method === 'OPTIONS'){
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
//     return res.status(200).json({});
//   }
//   next();
// });

const port = process.env.PORT || 5000;
app.use(routes);
app.listen(port, () => console.log(`Listening on port ${port}`));


//app.use('/.netlify/functions/server', routes);
//module.exports.handler = serverless(app);s
