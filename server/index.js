

const express = require('express');
const mongoose = require('mongoose');
const Books = require('./routes/crudRoutes');
const User = require('./routes/user');
const bodyParser = require('body-parser');
const formData = require('express-form-data');

const app  = express();


//connecting database
mongoose.connect('mongodb://localhost/mern-crud');
mongoose.connection.once('open',()=> {
    console.log('databse connected successfully');
});

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use('/api/books',Books);
app.use('/api/user',User);

const PORT = process.env.PORT || 5000;
app.listen(PORT , () =>  {
    console.log(`app is running at port ${PORT}`);
})