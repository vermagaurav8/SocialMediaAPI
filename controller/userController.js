const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/userSchema');

exports.authenticate = async (req, res) => {
    // Returns a Bearer Token
    const { email, password } = req.body;
    try{
        const user = await userSchema.findOne({ email });
        if(!user) {
            return res.status(402).json({ message: "User don't exists"});
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword) {
            return res.status(402).json({ message: "Wrong Password"});
        }

        const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, { expiresIn: "3h"});
        res.json({token});
    } catch (error) {
        return res.status(402).json({ message: console.log(error)});
    }
};

// get user profile (userName, followers, following count)
exports.getUser = async (req, res) => {
    try{
        const userId = req.user.userId; // Extracted from the Authorization Bearer token
        const user = await userSchema.findById(userId)
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }
        const profile = {
            username: user.name,
            followersCount: user.followers.length,
            followingCount: user.following.length,
        };
        res.json(profile);
    } catch(error) {
        return res.status(402).json({ message: console.log(error)});
    }
};

// Authorized user can follow each other
exports.followUserById = async (req, res) => {
    try{
        const userId = req.user.userId; // Extracted from the Authorization Bearer token
        const targetUserId = req.params.id;

        const user = await userSchema.findById(userId);
        const targetUser = await userSchema.findById(targetUserId);

        if (!user || !targetUser) {
            return res.status(404).json({ error: "User not found." });
        }
        if (user.following.includes(targetUserId) || targetUserId === userId) {
            return res.status(400).json({ message: "Already following" });
        }

        user.following.push(targetUserId);
        targetUser.followers.push(userId);

        await user.save();
        await targetUser.save();

        res.json({ message: "Successfully followed" });
    } catch(error) {
        return res.status(402).json({ message: console.log(error)});
    }
};

// Authorized user can unfollow each other
exports.unfollowUserById = async (req, res) => {
    try{
        const userId = req.user.userId; // Extracted from the decoded token
        const targetUserId = req.params.id;

        const user = await userSchema.findById(userId);
        const targetUser = await userSchema.findById(targetUserId);

        if (!user || !targetUser) {
            return res.status(404).json({ error: "User not found." });
        }
        if (!user.following.includes(targetUserId) || targetUserId === userId) {
            return res.status(400).json({ error: "Cannot unfollow this user." });
        }

        user.following.pull(targetUserId);
        targetUser.followers.pull(userId);

        await user.save();
        await targetUser.save();

        res.json({ message: "Unfollowed successfully." })
    } catch(error) {
        return res.status(402).json({ message: console.log(error)});
    }
};
