const express = require('express');
const db = require('./config');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', require('./routes'));

app.listen(3000, ()=>{
    console.log('server started');
});