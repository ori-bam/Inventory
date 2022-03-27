const express = require('express');
const router = express.Router();
const custDB = require('../public/DB/cust.json');
const writer = require('../public/js/main');


router.get('/', (req, res) => {
    res.render('customers', { custDB });
});

router.post('/show/:id', (req, res) => {

    var found = custDB.indexOf(custDB.find(cust => cust.id == req.body.id))

    if (found == -1) {
        res.send("customer not found");
    }
    res.render('singleCustomer', {
        id: custDB[found].id,
        name: custDB[found].name,
        email: custDB[found].email,
        phone: custDB[found].phone,
        city: custDB[found].city,

    });

});
router.post('/edit/:id', (req, res) => {

    var customer = custDB.filter(cust => cust.id == req.body.id);

    res.render('editCust', {
        id: customer[0].id,
        name: customer[0].name,
        email: customer[0].email,
        phone: customer[0].phone,
        city: customer[0].city,

    });

});

router.post('/edit', (req, res) => {

    found = custDB.indexOf(custDB.find(cust => cust.id = req.body.id));

    custDB[found].id = req.body.id;
    custDB[found].name = req.body.name;
    custDB[found].email = req.body.email;
    custDB[found].phone = req.body.phone;
    custDB[found].city = req.body.city;



    writer.write(res, __dirname, '../public/DB/cust.json', custDB);

    res.redirect('/customers');

});
router.get('/new', (req, res) => {

    res.render('addCust');

});

router.post('/add', (req, res) => {

    let { name, email, phone, city } = req.body;

    if (!name || !email || !phone || !city) {
        res.status(400).send();
    }

    custDB.push({
        id: (custDB.length + 1).toString(),
        name,
        email,
        phone,
        city
    });
    writer.write(res, __dirname, '../public/DB/cust.json', custDB);
    res.redirect('/customers');

});

router.post('/delete/', (req, res) => {

    customer = custDB.indexOf(custDB.find(cust => cust.id == req.body.id));
    custDB.splice(customer, 1);
    writer.write(res, __dirname, '../public/DB/cust.json', custDB);
    res.render('customers', { custDB });
});



module.exports = router;