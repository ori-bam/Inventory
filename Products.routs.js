const express = require('express');
const router = express.Router();
const prodDB = require('../public/DB/prod.json');
const writer = require('../public/js/main');


router.get('/', (req, res) => {
    res.render('products', { prodDB });
});

router.post('/show/:id', (req, res) => {

    var found = prodDB.indexOf(prodDB.find(prod => prod.id == req.body.id))

    if (found == -1) {
        res.send("product not found");
    }
    res.render('singleProduct', {
        id: prodDB[found].id,
        name: prodDB[found].name,
        category: prodDB[found].category,
        description: prodDB[found].description,
        picture: prodDB[found].picture,
        price: prodDB[found].price
    });

});
router.post('/edit/:id', (req, res) => {

    var prod = prodDB.filter(prod => prod.id == req.body.id);

    res.render('editProduct', {
        id: prod[0].id,
        name: prod[0].name,
        category: prod[0].category,
        description: prod[0].description,
        price: prod[0].price,
        picture: prod[0].picture
    });

});

router.post('/edit', (req, res) => {

    found = prodDB.indexOf(prodDB.find(prod => prod.id = req.body.id));

    prodDB[found].id = req.body.id;
    prodDB[found].name = req.body.name;
    prodDB[found].category = req.body.category;
    prodDB[found].description = req.body.description;
    prodDB[found].picture = req.body.picture;
    prodDB[found].price = req.body.price;


    writer.write(res, __dirname, '../public/DB/prod.json', prodDB);

    res.redirect('/products');

});
router.get('/new', (req, res) => {

    res.render('addProd');

});

router.post('/add', (req, res) => {

    let { name, description, category, price, picture } = req.body;

    if (!name || !description || !category || !price || !picture) {
        res.status(400).send();
    }

    prodDB.push({
        id: (prodDB.length + 1).toString(),
        name,
        description,
        category,
        price,
        picture
    });
    writer.write(res, __dirname, '../public/DB/prod.json', prodDB);
    res.redirect('/products');

});

router.post('/delete', (req, res) => {

    prod = prodDB.indexOf(prodDB.find(prod => prod.id == req.body.id));
    prodDB.splice(prod, 1);
    writer.write(res, __dirname, '../public/DB/prod.json', prodDB);
    res.render('products', { prodDB });
});



module.exports = router;