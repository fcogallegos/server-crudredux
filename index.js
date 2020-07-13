const express = require('express');
const conectDB = require('./config/db');
const cors = require('cors');

//create the server
const app = express();

//CONECT TO DATABASE
conectDB();

//enable cors
app.use(cors());

//enable express.json
app.use(express.json({ extended: true }));

//port of the server
const port = process.env.PORT || 4000;

//import routes
app.use('/api/products', require('./routes/products'));


//define the main page
app.get('/', (req, res) => {
    res.send('Hello world!');
});

//run the server
app.listen(port, '0.0.0.0', () => {
    console.log(`The server is running in the port ${port}`);
});
