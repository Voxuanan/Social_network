const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helper/auth");
const jwt = require("jsonwebtoken");

export const register = async (req, res) => {
    // console.log("REGISTER ENDPOINT => ", req.body);
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

        const user = new User({ name, email, password: hashedPassword, secret });
        // Save user
        await user.save();
        // console.log("REGISTER USER => ", user);
        return res.json({
            ok: true,
        });
    } catch (error) {
        console.log("REGISTER FALLED => ", error);
        res.status(400).send("Error, please try again");
    }
};

export const login = async (req, res) => {
    // console.log("LOGIN ENDPOINT => ", req.body);
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
        // console.log("LOGIN FALLED => ", error);
        res.status(400).send("Error, please try again");
    }
};

export const currentUser = async (req, res) => {
    // console.log(req.headers);
    // console.log(req.user);
    try {
        const { _id } = req.user;
        const user = await User.findById({ _id });
        res.json({ ok: true });
    } catch (error) {
        // console.log("CURRENT USER FALLED => ", error);
        res.status(400).send("Error, please try again");
    }
};

export const forgotPassword = async (req, res) => {
    // console.log(req.body);
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
        // console.log("FORGOT PASSWORD FALLED => ", error);
        res.status(400).send("Error, please try again");
    }
};
