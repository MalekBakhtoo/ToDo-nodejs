const express = require('express');
const path = require('path');
const app = express();
const todoModel = require('./models/todo');
require('./db')();
app.use(express.static('public'))
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/' , async (req , res ) => {
    const tasks = await todoModel.find();
    res.render('index' , {tasks :tasks});
})
app.listen(3000);