const jwt = require('jsonwebtoken');
const express = require('express');
const { where } = require('sequelize');
const { Users } = require('../models');
const router = express.Router();
const cookieParser = require('cookie-parser');

router.use(cookieParser());

router.post("/register", async (req, res) => {
    const {username, password, role} = req.body;

    const userExists = await Users.findOne({where: { username }});

    if (userExists) {
        return res.status(400).json({message: "Username already taken"});
    }

    const newUser = await Users.create({
        username,
        password,
        role: role || "user"
    });

    res.status(201).json({message: "User registered successfully"});
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username }});

    if (!user || user.password != password) {
        return res.status(403).json({ logged: false, message: "Invalid user or password"});
    }
    //let token = jwt.sign({user: user.username, role: user.role}, '53nh@', { expiresIn: '30m'});
    let token = jwt.sign({ id: user.id, username: user.username, role: user.role }, '53nh@', { expiresIn: '30m' });

    // Armazna token no cookie
    res.cookie("token", token);

    res.redirect("/tickets");
});



module.exports = router;