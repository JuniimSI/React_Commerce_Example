const express = require('express');
const routes = express.Router();

const fs = require('fs');
const data = require('./data/products.json');


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.ogirinalname+path.extname(file.originalname));
    },
})
const upload = multer({ storage })


routes.post("/upload", upload.single('img'), (req, res) => {
    console.log(req.body, req.file)
    res.send("ok")
})

routes.get("/", (req, res) => res.render("home"))









routes.get('/api/mensagem', (req, res) => {
    res.send({ express: 'Come on dude' });
});





routes.post('/products/create/json', function (req, res) {
    const { id, product_name, description, price, currency, thumb } = req.body

    data.products.push({ id, product_name, description, price, currency, thumb })

    fs.writeFile('./data/products.json', JSON.stringify(data), (error) => {
        if (error) return res.status(400).json({ message: "Error while register" });
    })
    return res.send(req.body);
})

routes.get('/products/list/json', (req, res) => {
    return res.json(data.products);
})

routes.put('/products/update/:id', (req, res) => {
    data.products = data.products.map(prod => {
        if (prod.id == req.params.id) {
            return ({
                ...prod,
                ...req.body
            })
        } else {
            return prod;
        }
    })
    return res.json(data.products);
})

routes.get('/products/show/:id', (req, res) => {
    var product = data.products.find(element => element.id == req.params.id);
    if (product) res.json(product);
    else res.sendStatus(404);
})

routes.delete('/products/delete/:id', (req, res) => {
    let found = data.products.find(function (item) {
        return item.id === parseInt(req.params.id);
    });

    if (found) {
        // if item found then find index at which the item is
        // stored in the `data` array
        let targetIndex = data.products.indexOf(found);

        // splice means delete item from `data` array using index
        data.products.splice(targetIndex, 1);
    }

    // return with status 204
    // success status response code 204 indicates
    // that the request has succeeded
    res.sendStatus(204);
})

module.exports = routes;