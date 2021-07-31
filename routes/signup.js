const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        console.log("body", req.body);
        const schema = Joi.object({
            username: Joi.string().min(3).max(30).required(),
            email: Joi.string().min(3).max(200).required().email(),
            password: Joi.string().min(6).max(200).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send("User already exists...");
        }

        const { username, email, password } = req.body;

        user = new User({ username, email, password });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();

        const token = jwt.sign({
            _id: user._id,
            username: user.username,
            email: user.email
        },
            process.env.JWT_SECRET_KEY)

        res.send(token);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;