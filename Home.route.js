const express = require('express');
const router = express.Router();
const db1 = require('../public/DB/supp.json');
const db2 = require('../public/DB/prod.json');
const db3 = require('../public/DB/invoice.json');
const db4 = require('../public/DB/cust.json');
const db5 = require('../public/DB/orders.json');


router.get('/', (req, res) => {
    res.render('home', { db1, db2, db3, db4, db5 });
});

module.exports = router;