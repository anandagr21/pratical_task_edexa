const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;
        const schema = Joi.object({
            email: Joi.string().min(3).max(200).required().email(),
            password: Joi.string().min(6).max(200).required(),
        });

        const { error } = schema.validate(req.body);

        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        let user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).send("Invalid email or password...");
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).send("Invalid email or password...");
        }

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