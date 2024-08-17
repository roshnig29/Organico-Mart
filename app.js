const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const homerouter = require('./router/home')
const port = process.env.port || 8080;
const app = express();
//mongoose.connect('mongodb://localhost:27017/Organico_db', { useNewUrlParser: true });
mongoose.connect('mongodb://host.docker.internal:27017/Organico_db', { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", () => {
    console.log("error in connection");
})
db.once('open', () => {
    console.log("Connected");

})
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', homerouter)
app.listen(port)