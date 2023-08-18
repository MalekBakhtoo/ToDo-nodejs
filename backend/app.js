const express = require('express');
const path = require('path');
const app = express();
const todoRouter = require('./routers/todo');
const userRouter = require('./routers/user');
const cookies = require('cookie-parser');

require('./db')();
app.use(express.static('public'))
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookies());
app.use ('/todo' ,todoRouter );
app.use ('/user' ,userRouter );




app.get('/' , async (req , res ) => {
    res.render('home');
})
app.listen(3000);