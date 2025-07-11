const express = require('express');
const app = express();
const userModel = require('./models/user')

const path = require('path');
const fs = require('fs')
const cookieParser = require('cookie-parser')
require('dotenv').config();

// fs.writeFile(path.join(__dirname,  'views', 'index.ejs'), 'this is ejs file', ()=>{})
///middlewares
app.set("view engine", "ejs")
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'));
app.use(cookieParser())


app.get('/', (req, res) => {
    res.render('index')
})






const PORT = process.env.PORT || 2020
app.listen(PORT, ()=> console.log(`server is running on ${PORT}`))