const express = require('express');
const massive = require('massive');
const bodyParser = require('body-parser');
const cors = require('cors');

const {dbUser, dbPass, db} = require('./config');

const port = 3000;
//connection string definition
const connectionString = `postgres://${dbUser}:${dbPass}@localhost/${db}`;

const app = express();

app.use(bodyParser.json());
app.use( cors() );

const massiveConnection = massive(connectionString)
    .then(db=>{
    app.set('db', db);
})
.catch(err => {
    console.log(err);
});
// bring in ctrl before app declarations after db aka here
const productsController = require('./products_controller');

app.get('/api/products', productsController.getAll);
app.get('/api/product/:id', productsController.getOne);
app.put('/api/product/:id', productsController.update);
app.post('/api/product', productsController.create);
app.delete('/api/product/:id', productsController.delete);


app.listen(port, ()=>{
    console.log(`listening on port: ${port}, praise the lord and savior`);
})