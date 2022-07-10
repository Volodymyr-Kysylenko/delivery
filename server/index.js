const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5222;

const Schema = mongoose.Schema;

const productsScheme = new Schema({ id: Number, shop: String, name: String, price: Number }, { versionKey: false });
const Products = mongoose.model('Products', productsScheme);

const ordersScheme = new Schema({ number: Number, name: String, email: String, phone: String, address: String, orderList: Array, totalPrice: Number, status: String, orderTime: String }, { versionKey: false });
const Orders = mongoose.model('Orders', ordersScheme);

app.use(cors());
app.use(express.json());

app.get('/api/shops', (req, res) => {
    Products.find({}).distinct('shop', function (err, shops) {
        if (err) return console.log(err);
        res.send(shops);
    });
});

app.post('/api/submit', (req, res) => {
    Orders.find({ _id: { $exists: true } }, function (err, check) {
        if (check.length !== 0) {
            Orders
                .find({})
                .sort({ number: -1 })
                .limit(1)
                .then(max => {
                    req.body.order.number = max[0].number + 1;
                    const order = new Orders(req.body.order);
                    order.save(function (err) {
                        if (err) return console.log(err);
                        res.send(`${order.number}`);
                    });
                });
        } else {
            req.body.order.number = 1;
            const order = new Orders(req.body.order);
            order.save(function (err) {
                if (err) return console.log(err);
                res.send(`${order.number}`);
            });
        }
    });
});

app.post('/api/products', (req, res) => {
    Products.find({ shop: req.body.shop }, function (err, products) {
        if (err) return console.log(err);
        res.send(products);
    });
});

app.post('/api/orders', (req, res) => {
    let email = (req.body.email === '') ? [/^/] : req.body.email;
    if (req.body.number === '') {
        Orders.find({ email: { $in: email } }, function (err, orders) {
            if (err) return console.log(err);
            res.send(orders);
        });
    } else {
        Orders.find({ email: { $in: email }, number: Number(req.body.number) }, function (err, orders) {
            if (err) return console.log(err);
            res.send(orders);
        });
    }
});

app.post('/api/order', (req, res) => {
    Products.find({ id: { $in: req.body.id } }, function (err, products) {
        if (err) return console.log(err);
        res.send(products);
    });
});

mongoose.connect('mongodb+srv://spectrum_admin:U67GQxyBqeOQkdlC@cluster0.oc88i.mongodb.net/delivery?retryWrites=true&w=majority', { useUnifiedTopology: true, useNewUrlParser: true }, function (err) {
    if (err) return console.log(err);
    app.listen(PORT, function () {
        console.log('The server is running on a port ' + PORT);
    });
});