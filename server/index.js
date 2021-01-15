const express = require("express");
const app = express();
const multer = require("multer");

app.set('view engine', 'ejs');

const upload = multer({dest: "uploads/"});

app.get("/", (req, res) => {
    res.render("home");
})

app.post("/upload", upload.single("img"), (req, res) => {
    res.send("Arquivo recebido");
})

app.listen(5000, () => {
    console.log("running");
})