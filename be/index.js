const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");

const review = require('./routes/review/review');
const app = express();


// using morgan for logs
app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/review', review)

app.get('/', (req, res) => {
    res.send("Hello I am working my friend Supabase <3");
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});