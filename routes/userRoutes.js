const express = require('express');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth'); // To check if user is authorized to perform operations
const userSchema = require('../models/userSchema');
const controller = require('../controller/userController');
const router = express.Router();

// Requests
router.post('/register', async(req, res) => {
    const {email, password, name} = req.body;

    try {
        const existingUser = await userSchema.findOne({ email });
        if (existingUser) {
            return res.status(402).json({ message: "User already exists" });
        }

        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new userSchema({
            email,
            password: hashPass,
            name,
        });

        await newUser.save();
        res.json({ message: "User registered successfully" });
    } catch (error) {
        res.status(402).json({ err: console.log(error)})
    }
});

router.post('/authenticate', controller.authenticate);
router.post('/follow/:id', auth.isAuthorized, controller.followUserById);
router.post('/unfollow/:id', auth.isAuthorized, controller.unfollowUserById);
router.get('/user', auth.isAuthorized, controller.getUser);

module.exports = router;
