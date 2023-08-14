const express = require('express');
const path = require('path');
const app = express();
const todoRouter = require('./routers/todo');
require('./db')();
app.use(express.static('public'))
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use ('/todo' ,todoRouter );

app.get('/' , async (req , res ) => {
    res.render('home');
})
app.listen(3000);