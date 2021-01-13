const express = require('express');
const routes = express.Router();
const fs = require('fs');
const { isRegularExpressionLiteral } = require('typescript');
const data = require('./data/products.json');

routes.get('/api/mensagem', (req, res) => {
    res.send({ express: 'Come on dude' });
});

routes.post('/products/create/json', function (req, res) {
    const { id, product_name, description, price, currency, thumb } = req.body

    data.products.push( { id, product_name, description, price, currency, thumb } )

    fs.writeFile('./data/products.json', JSON.stringify(data), (error) => {
        if(error) return res.status(400).json({message: "Error while register"});
    })
    return res.send(req.body);
})

routes.get('/products/list/json', (req, res) => {
    return res.json(data.products);
})

routes.put('/products/update/:id', (req, res) => {
    data.products = data.products.map(prod => {
        if(prod.id == req.params.id){
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

module.exports = routes;