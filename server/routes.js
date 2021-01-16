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
        cb(null, req.body.id+path.extname(file.originalname));
    },
})
const upload = multer({ storage })

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//routes.get("/", (req, res) => res.render("home"))

//Get List Of Products
routes.get('/', (req, res) => {
    return res.json(data.products);
})

//Get Product by Id
routes.get('/show/:id', (req, res) => {
    var product = data.products.find(element => element.id == req.params.id);
    if (product) res.json(product);
    else res.sendStatus(404);
})

routes.post('/create', upload.single('img'), (req, res) => {
        const { id, product_name, description, price, currency } = req.body;
        const thumb = './uploads/'+id+path.extname(req.file.originalname);
        data.products.push({ id, product_name, description, price, currency, thumb })
    
        fs.writeFile('./data/products.json', JSON.stringify(data), (error) => {
            if (error) return res.status(400).json({ message: "Error while register" });
        })
        return res.send(req.body);
})

routes.put('/edit/:id', (req, res) => {
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

routes.delete('/delete/:id', (req, res) => {
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

routes.get("/register", (req, res) => {
    console.log("Chega aqui")
    res.sendFile(path.join(__dirname +"/about.html"))
})
/////////////////////////////routes.get("/register", (req, res) => res.render("register"))

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// routes.post('/products/create/json', upload.single('img'), (req, res) => {
//     const { id, product_name, description, price, currency } = req.body;
//     const thumb = './uploads/'+id+path.extname(req.file.originalname);
//     data.products.push({ id, product_name, description, price, currency, thumb })

//     fs.writeFile('./data/products.json', JSON.stringify(data), (error) => {
//         if (error) return res.status(400).json({ message: "Error while register" });
//     })
//     return res.send(req.body);
// })

// routes.put('/products/update/:id', (req, res) => {
    
// })

// routes.get('/products/show/:id', (req, res) => {
    
// })

// routes.delete('/products/delete/:id', (req, res) => {
    
// })

module.exports = routes;