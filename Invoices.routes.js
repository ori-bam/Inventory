const express = require('express');
const router = express.Router();
const invDB = require('../public/DB/invoice.json');
const writer = require('../public/js/main');


router.get('/', (req, res) => {
    res.render('invoices', { invDB });
});

router.post('/show/:id', (req, res) => {

    var found = invDB.indexOf(invDB.find(inv => inv.id == req.body.id))

    if (found == -1) {
        res.send("invoice not found");
    }
    res.render('singleInvoice', {
        id: invDB[found].id,
        date: invDB[found].date,
        to: invDB[found].to,
        payment: invDB[found].payment,
        quantity: invDB[found].quantity,
        description: invDB[found].description,
        total: invDB[found].total
    });

});
router.post('/edit/:id', (req, res) => {

    var inv = invDB.filter(inv => inv.id == req.body.id);

    res.render('editInv', {
        id: inv[0].id,
        date: inv[0].date,
        to: inv[0].to,
        payment: inv[0].payment,
        quantity: inv[0].quantity,
        description: inv[0].description,
        total: inv[0].total,

    });

});

router.post('/edit', (req, res) => {

    found = invDB.indexOf(invDB.find(inv => inv.id = req.body.id));

    invDB[found].id = req.body.id;
    invDB[found].date = req.body.date;
    invDB[found].to = req.body.to;
    invDB[found].payment = req.body.payment;
    invDB[found].quantity = req.body.quantity;
    invDB[found].description = req.body.description;
    invDB[found].total = req.body.total;


    writer.write(res, __dirname, '../public/DB/invoice.json', prodDB);

    res.redirect('/invoices');

});
router.get('/new', (req, res) => {

    res.render('addInvoice');

});

router.post('/add', (req, res) => {

    let { date, to, payment, quantity, description, total } = req.body;

    if (!date || !to || !payment || !quantity || !description || !total) {
        res.status(400).send();
    }

    invDB.push({
        id: (invDB.length + 1).toString(),
        date,
        to,
        payment,
        quantity,
        description,
        total

    });
    writer.write(res, __dirname, '../public/DB/invoice.json', invDB);
    res.redirect('/invoices');

});

router.post('/delete.', (req, res) => {

    inv = invDB.indexOf(invDB.find(inv => inv.id == req.body.id));
    invDB.splice(inv, 1);
    writer.write(res, __dirname, '../public/DB/invoice.json', invDB);
    res.render('invoices', { invDB });
});



module.exports = router;