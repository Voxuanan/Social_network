const User = require("../models/user");
const { hashPassword, comparePassword } = require("../helper/auth");

export const register = async (req, res) => {
    // console.log("REGISTER ENDPOINT => ", req.body);
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
    try {
        await user.save();
        // console.log("REGISTER USER => ", user);
        return res.json({
            ok: true,
        });
    } catch (error) {
        console.log("REGISTER FALLED => ", error);
        res.status(404).send("Error, please try again");
    }
};
