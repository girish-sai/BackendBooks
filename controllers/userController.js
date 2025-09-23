const express = require('express');

const User = require('../models/userModel');

const createToken = require('../utils/token');
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ message: "Your Does Not Existss" });
    }
};  
const registerUser = async (req, res) => {
    const {name,email,password}=req.body;  // Removed _id from destructuring
    try {
        const user = await User.signup(name,email,password);  // Fixed: Use static signup method
        const token = createToken(user._id);

        res.status(201).json({ message: 'User registered successfully', email, token });  // Removed password from response
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   

};

module.exports = { loginUser, registerUser };