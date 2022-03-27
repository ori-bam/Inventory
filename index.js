const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

const CustomersRoutes = require('./routes/Customers.routes');
const ProductsRoutes = require('./routes/Products.routs');
const InvoicesRoutes = require('./routes/Invoices.routes');
const SuppliersRoutes = require('./routes/Suppliers.routes');
const OrdersRoutes = require('./routes/Orders.routes');
const HomeRoutes = require('./routes/Home.route');

app.engine('hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/customers', CustomersRoutes);
app.use('/products', ProductsRoutes);
app.use('/invoices', InvoicesRoutes);
app.use('/suppliers', SuppliersRoutes);
app.use('/orders', OrdersRoutes);
app.use('/', HomeRoutes);

app.listen(port, () => console.log(`server is running in port ${port}`));

module.exports.path = path;