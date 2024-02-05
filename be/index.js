const express = require('express');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const formidable = require('express-formidable');


const review = require('./routes/reviews/reviews');
const volunteer = require('./routes/volunteers/volunteers');
const campaign = require('./routes/campaigns/campaigns');
const coordinator = require('./routes/coordinators/coordinators');
const statistics = require('./routes/statistics/statistics');
const app = express();

// using morgan for logs
app.use(morgan('combined'));
app.use(formidable());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/reviews', review);
app.use('/volunteers', volunteer);
app.use('/campaigns', campaign);
app.use('/coordinators', coordinator);
app.use('/statistics', statistics);

app.get('/', (req, res) => {
    res.send("Hello I am working my friend Supabase <3");
});

app.listen(3000, () => {
    console.log(`> Ready on http://localhost:3000`);
});

