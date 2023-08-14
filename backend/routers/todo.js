const express = require('express');
const Router = express.Router();
const todoModel = require('../models/todo');

Router.get('/', async (req, res) => {
    const tasks = await todoModel.find();
    res.status(200).render('index');
});
Router.get('/data', async (req, res) => {
    const tasks = await todoModel.find();
    res.status(200).send(tasks);
});
Router.post('/', async (req, res) => {
    const title = req.body.title;
    const todo = new todoModel({ title: title });
    await todo.save();
    res.status(200).send();
});
Router.post('/conditon' , async (req , res) =>{
    const title = req.body.title;
    const todo = await todoModel.findOne({ title : title});
    await todo.updateOne({isDone : !todo.isDone});
    res.status(200).send();

});
Router.post('/delete', async (req, res) => {
    const title = req.body.title;
    await todoModel.findOneAndDelete({title : title});
    res.status(200).send();
});
module.exports = Router;