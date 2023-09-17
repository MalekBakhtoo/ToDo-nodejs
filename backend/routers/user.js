const express = require('express');
const Router = express.Router();
const { userModel, validateUser, validateLogin, validateUserUpdate } = require('../models/user');
const bcrypt = require('bcrypt');
const mailer = require('../mailer');
const jwt = require('jsonwebtoken');
const auth = require('../midellware/auth');


Router.get('/signup', async (req, res) => {
    res.render('user/signup', { error: null });
});
Router.post('/signup', async (req, res) => {
    const userObj = {
        name: req.body.username,
        email: req.body.email,
        password: req.body.password
    }
    let { error } = validateUser(userObj);
    if (error) { return res.status(400).render('user/signup', { error: error.details[0].message }); }

    let user = await userModel.findOne({ email: userObj.email });
    if (user) return res.status(400).render('user/signup', { error: "this email is already exsit" });
    const salt = await bcrypt.genSalt(10);
    userObj.password = await bcrypt.hash(userObj.password, salt);

    let token = jwt.sign(userObj, 'privateKey', { expiresIn: "3m" });
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
});

Router.get('/login', async (req, res) => {
    res.render('user/login', { error: null });
});
Router.post('/login', async (req, res) => {
    const userObj = {
        email: req.body.email,
        password: req.body.password
    }
    let { error } = validateLogin(userObj);
    if (error) { return res.status(400).render('user/login', { error: error.details[0].message }); }
    let user = await userModel.findOne({ email: userObj.email });
    if (!user) return res.status(400).render('user/login', { error: "email and password not match" });
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).render('user/login', { error: "email and password not match" });
    res.cookie('jwt', user.genereatJwt(), {
        httpOnly: true,
        maxAge: 3 * 60 * 60 * 1000,
    });
    res.redirect('../todo');
});
Router.get('/logout', auth, async (req, res) => {
    res.render('user/logout', { error: null });
});
Router.post('/logout', auth, async (req, res) => {
    const user = await userModel.findOne({ email: req.cookies.user.email });
    if (!user) return res.render('user/login');
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).render('user/logout', { error: "password not match try again" });
    res.cookie('jwt', '');
    res.redirect('../todo');
});
Router.get('/fogotMyPassword', async (req, res) => {
    res.render('user/passwordRecovery', { error: null });
});

Router.post('/fogotMyPassword', async (req, res) => {
    const inputEmail = req.body.email;
    if (!inputEmail) return res.render('user/passwordRecovery', { error: 'input a valid email' });
    const user = await userModel.findOne({ email: inputEmail });
    if (!user) return res.render('user/passwordRecovery', { error: 'input a valid email no user found' });

    let token = jwt.sign({ email: inputEmail }, 'privateKey', { expiresIn: "3m" });
    mailer(inputEmail, "Password Recovery", 'click the link to change your password  http://localhost:3000/user/changeMyPassword/' + token);
    res.send("an email with a recovery link have sent to you please check your email and use link to change your password you have 3min");
});

Router.get('/changePassword', auth, async (req, res) => {
    let token = jwt.sign({ email: req.cookies.user.email }, 'privateKey', { expiresIn: "3m" });
    res.redirect('/user/changeMyPassword/' + token)
});
Router.get('/changeMyPassword/:token', async (req, res) => {
    try {
        const token = req.params.token;
        const verify = jwt.verify(token, 'privateKey');
        res.cookie('emailedtoken', verify);
        res.render('user/changePassword', { error: null });


    } catch (ex) {
        res.redirect('/user/fogotMyPassword');
    }
});

Router.post('/changeMyPassword', async (req, res) => {
    const email = req.cookies.emailedtoken.email;
    const newPassword = req.body.password;
    if (!email) { return res.render('user/passwordRecovery', { error: "input a valid email" }); }
    if (!newPassword) { return res.render('user/changePassword', { error: "password is requaired" }); }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    const user = await userModel.findOne({ email: email });
    await user.updateOne({ password: hashedPassword });
    res.redirect('/login')
});
Router.get('/profile', auth, async (req, res) => {
    const email = req.cookies.user.email;
    const user = await userModel.findOne({ email: email });
    
    res.render('user/profile', { user: user });
});
Router.post('/profileUpdate', auth, async (req, res) => {

    const { error } = validateUserUpdate(req.body);
    if (error) return res.send("not valid data");

    const name = req.body.name;
    const phone = req.body.phone;
    const mobile = req.body.mobile;
    const address = req.body.address;

    const user = await userModel.findOne({ email: req.cookies.user.email });
    await user.updateOne({
        name: name,
        phone: phone,
        mobile: mobile,
        address: address
    });
    res.redirect('/user/profile');

});
Router.get('/uploadImage', auth, async (req, res) => {
    res.render("user/profileUpload");
});
Router.post('/uploadImage', auth, async (req, res) => {
    const { image } = req.files;
    if (!image) return res.sendStatus(400);

    image.mv('./public/userImage/' + req.cookies.user._id +".png");
    const user = await userModel.findOne({email : req.cookies.user.email});
    await user.updateOne({ image : '/userImage/' + req.cookies.user._id +".png" });

    res.redirect('/user/profile');
});
module.exports = Router;
