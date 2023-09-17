const express = require('express');
const path = require('path');
const app = express();
const todoRouter = require('./routers/todo');
const userRouter = require('./routers/user');
const cookies = require('cookie-parser');
const fileUpload = require('express-fileupload');


require('./db')();
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(
    fileUpload({
        limits: {
            fileSize: 10000000,
        },
        abortOnLimit: true,
    })
);

app.use(express.urlencoded({ extended: true }));
app.use(cookies());

app.use('/todo', todoRouter);
app.use('/user', userRouter);




app.get('/', async (req, res) => {
    res.redirect('/todo');
})
app.listen(3000);