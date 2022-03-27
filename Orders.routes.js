const express = require('express');
const router = express.Router();
const ordDB = require('../public/DB/orders.json');
const writer = require('../public/js/main');


router.get('/', (req, res) => {
    res.render('orders', { ordDB });
});

router.post('/show/:id', (req, res) => {

    var found = ordDB.indexOf(ordDB.find(inv => inv.id == req.body.id))

    if (found == -1) {
        res.send("order not found");
    }
    res.render('singleOrder', {
        id: ordDB[found].id,
        date: ordDB[found].date,
        to: ordDB[found].to,
        total: ordDB[found].total
    });

});
router.post('/edit/:id', (req, res) => {

    var ord = ordDB.filter(ord => ord.id == req.body.id);

    res.render('editOrd', {
        id: ord[0].id,
        date: ord[0].date,
        to: ord[0].to,
        total: ord[0].total,

    });

});

router.post('/edit', (req, res) => {

    found = ordDB.indexOf(ordDB.find(ord => ord.id = req.body.id));

    ordDB[found].id = req.body.id;
    ordDB[found].date = req.body.date;
    ordDB[found].to = req.body.to;
    ordDB[found].total = req.body.total;


    writer.write(res, __dirname, '../public/DB/orders.json', ordDB);

    res.redirect('/orders');

});
router.get('/new', (req, res) => {

    res.render('addOrd');

});

router.post('/add', (req, res) => {

    let { date, to, total } = req.body;

    if (!date || !to || !total) {
        res.status(400).send();
    }

    ordDB.push({
        id: (ordDB.length + 1).toString(),
        date,
        to,
        total

    });
    writer.write(res, __dirname, '../public/DB/orders.json', ordDB);
    res.redirect('/invoices');

});

router.post('/delete', (req, res) => {

    ord = ordDB.indexOf(ordDB.find(ord => ord.id == req.body.id));
    ordDB.splice(ord, 1);
    writer.write(res, __dirname, '../public/DB/orders.json', ordDB);
    res.render('orders', { ordDB });
});



module.exports = router;