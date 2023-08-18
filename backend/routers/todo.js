const express = require('express');
const Router = express.Router();
const todoModel = require('../models/todo');
const auth = require('../midellware/auth');

Router.get('/', auth, async (req, res) => {
    const tasks = await todoModel.find();
    res.status(200).render('index');
});
Router.get('/data', auth, async (req, res) => {
    const tasks = await todoModel.find({ email: req.cookies.user.email });
    res.status(200).send(tasks);
});
Router.post('/', auth, async (req, res) => {
    const title = req.body.title;
    const todo = new todoModel({
        title: title,
        email : req.cookies.user.email,
    });
    await todo.save();
    res.status(200).send();
});
Router.post('/conditon', auth, async (req, res) => {
    const title = req.body.title;
    const todo = await todoModel.findOne({ title: title ,email:req.cookies.user.email});
    await todo.updateOne({ isDone: !todo.isDone });
    res.status(200).send();

});
Router.post('/delete', auth, async (req, res) => {
    const title = req.body.title;
    await todoModel.findOneAndDelete({ title: title });
    res.status(200).send();
});
module.exports = Router;