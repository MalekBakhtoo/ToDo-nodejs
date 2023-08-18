const express = require('express');
const Router = express.Router();
const { userModel, validateUser, validateLogin } = require('../models/user');
const bcrypt = require('bcrypt');
const mailer = require('../mailer');
const jwt = require('jsonwebtoken');

Router.get('/signup', async (req, res) => {
    res.render('signup', { error: null });
});
Router.post('/signup', async (req, res) => {
    const userObj = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    let { error } = validateUser(userObj);
    if (error) { return res.status(400).render('signup', { error: error.details[0].message }); }

    let user = await userModel.findOne({ email: userObj.email });
    if (user) return res.status(400).render('signup', { error: "this email is already exsit" });
    const salt = await bcrypt.genSalt(10);
    userObj.password = await bcrypt.hash(userObj.password, salt);



    let token = jwt.sign(userObj, 'privateKey', { expiresIn: "2h" });
    mailer(userObj.email, "verify link", 'click the link to verify your email http://localhost:3000/user/emailVerify/' + token);
    res.status(200).send('an email have been sent to you please check your email and  click the link to verify your email');
});
Router.get('/emailVerify/:token', async (req, res) => {

    try {
        const token = req.params.token;
        const verify = jwt.verify(token, 'privateKey');
        let user = await new userModel(verify);
        await user.save();
        res.cookie('jwt', user.genereatJwt(), {
            httpOnly: true,
            maxAge: 3 * 60 * 60 * 1000,
        });
        res.redirect('../../todo');

    } catch (ex) {
        res.redirect('/signup');
    }
})

Router.get('/login', async (req, res) => {
    res.render('login', { error: null });
});
Router.post('/login', async (req, res) => {
    const userObj = {
        email: req.body.email,
        password: req.body.password
    }
    let { error } = validateLogin(userObj);
    if (error) { return res.status(400).render('login', { error: error.details[0].message }); }
    let user = await userModel.findOne({ email: userObj.email });
    if (!user) return res.status(400).render('login', { error: "email and password not match" });
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).render('login', { error: "email and password not match" });
    res.cookie('jwt', user.genereatJwt(), {
        httpOnly: true,
        maxAge: 3 * 60 * 60 * 1000,
    });
    res.redirect('../todo');
});
Router.get('/logout', async (req, res) => {
    res.render('logout', { error: null });
});
Router.post('/logout', async (req, res) => {
    const user = await userModel.findOne({ email: req.cookies.user.email });
    if (!user) return res.render('home');
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).render('logout', { error: "password not match try again" });
    res.cookie('jwt', '');
    res.redirect('../');
});
module.exports = Router;