const express = require('express');
const router = express.Router();
const suppDB = require('../public/DB/supp.json');
const writer = require('../public/js/main');


router.get('/', (req, res) => {
    res.render('suppliers', { suppDB });
});

router.post('/show/:id', (req, res) => {

    var found = suppDB.indexOf(suppDB.find(supp => supp.id == req.body.id))

    if (found == -1) {
        res.send("supplier not found");
    }
    res.render('singleSupplier', {
        id: suppDB[found].id,
        name: suppDB[found].name,
        email: suppDB[found].email,
        phone: suppDB[found].phone,
        city: suppDB[found].city

    });

});
router.post('/edit/:id', (req, res) => {

    var supp = suppDB.filter(supp => supp.id == req.body.id);

    res.render('editSupp', {
        id: supp[0].id,
        name: supp[0].name,
        email: supp[0].email,
        phone: supp[0].phone,
        city: supp[0].city
    });

});

router.post('/edit', (req, res) => {

    found = suppDB.indexOf(suppDB.find(supp => supp.id = req.body.id));

    suppDB[found].id = req.body.id;
    suppDB[found].name = req.body.name;
    suppDB[found].email = req.body.email;
    suppDB[found].phone = req.body.phone;
    suppDB[found].city = req.body.city;


    writer.write(res, __dirname, '../public/DB/supp.json', suppDB);

    res.redirect('/suppliers');

});
router.get('/new', (req, res) => {

    res.render('addSupp');

});

router.post('/add', (req, res) => {

    let { name, email, phone, city } = req.body;

    if (!name || !email || !phone || !city) {
        res.status(400).send();
    }

    suppDB.push({
        id: (suppDB.length + 1).toString(),
        name,
        email,
        phone,
        city
    });
    writer.write(res, __dirname, '../public/DB/supp.json', suppDB);
    res.redirect('/suppliers');

});

router.post('/delete', (req, res) => {

    supp = suppDB.indexOf(suppDB.find(supp => supp.id == req.body.id));
    suppDB.splice(supp, 1);
    writer.write(res, __dirname, '../public/DB/supp.json', suppDB);
    res.render('suppliers', { suppDB });
});



module.exports = router;