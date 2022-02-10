const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helper/auth");
const jwt = require("jsonwebtoken");
import { nanoid } from "nanoid";

export const register = async (req, res) => {
    try {
        const { name, email, password, secret } = req.body;
        // validation
        if (!name) return res.status(400).send("Name is required");
        if (!email) return res.status(400).send("Email is required");
        if (!password || password.length < 6)
            return res.status(400).send("Password is required and at least 6 characters");
        if (!secret) return res.status(400).send("Answer is required");
        const exist = await User.findOne({ email });
        if (exist) return res.status(400).send("Email is taken");
        // hash password
        const hashedPassword = await hashPassword(password);

        const user = new User({
            name,
            email,
            password: hashedPassword,
            secret,
            username: nanoid(7),
        });
        // Save user
        await user.save();
        return res.json({
            ok: true,
        });
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send("Email or password is incorrect");
        const match = await comparePassword(password, user.password);
        if (!match) return res.status(400).send("Email or password is incorrect");
        // create sign token
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        user.password = undefined;
        user.secret = undefined;
        res.json({ token, user });
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const currentUser = async (req, res) => {
    try {
        const { _id } = req.user;
        const user = await User.findById({ _id });
        res.json({ ok: true });
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email, newPassword, secret } = req.body;
        if (!newPassword || newPassword.length < 6)
            return res.status(400).send("New password is required and at least 6 characters");
        if (!secret) return res.status(400).send("Secret is required");
        const user = await User.findOne({ email, secret });
        if (!user) return res.status(400).send("Email or secret is incorrect");
        const hashedPassword = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, { password: hashedPassword });
        return res.json({
            ok: true,
        });
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const profileUpdate = async (req, res) => {
    try {
        const data = {};
        if (req.body.username) {
            data.username = req.body.username;
        }
        if (req.body.about) {
            data.about = req.body.about;
        }
        if (req.body.name) {
            data.name = req.body.name;
        }
        if (req.body.email) {
            data.email = req.body.email;
        }
        if (req.body.password) {
            if (req.body.password.length < 6) {
                return res.status(400).send("New password is required and at least 6 characters");
            } else data.password = await hashPassword(req.body.password);
        }
        if (req.body.secret) {
            data.secret = req.body.secret;
        }
        if (req.body.image) {
            data.image = req.body.image;
        }

        let user = await User.findByIdAndUpdate(req.user._id, data, { new: true });
        user.password = undefined;
        user.secret = undefined;
        res.json(user);
    } catch (error) {
        if (error.code == 11000) {
            return res.status(400).send("Duplicate username");
        }
        res.status(400).send("Error, please try again");
    }
};

export const findPeople = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        let following = user.following;
        following.push(user._id);
        const people = await User.find({ _id: { $nin: following } })
            .select("-password -secret")
            .limit(10);
        res.json(people);
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const addFollower = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id, {
            $addToSet: { followers: req.user._id },
        });
        next();
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const userFollow = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $addToSet: { following: req.body._id },
            },
            { new: true }
        ).select("-password -secret");
        res.json(user);
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const removeFollower = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id, {
            $pull: { followers: req.user._id },
        });

        next();
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const userUnfollow = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                $pull: { following: req.body._id },
            },
            { new: true }
        ).select("-password -secret");
        res.json(user);
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const userFollowing = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        const following = await User.find({ _id: { $in: user.following } });
        res.json(following);
    } catch (error) {
        res.status(400).send("Error, please try again");
    }
};

export const searchUser = async (req, res) => {
    const { query } = req.params;
    if (!query) return;
    try {
        // $regex is a special method from mongodb and the i modifier i used to pefrom case-insensitive matching
        const user = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { username: { $regex: query, $options: "i" } },
            ],
        }).select("-password -secret");
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error, please try again");
    }
};
