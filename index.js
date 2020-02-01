const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = new express();

app.get('/', (req, res) => {
    res.send('Hey Hello');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT);