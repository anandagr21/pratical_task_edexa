const moongoose = require("mongoose");

const userSchema = new moongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 30
        },
        email: {
            type: String,
            required: true,
            index: true,
            unique: true,
            minlength: 3,
            maxlength: 200,
        },
        password: {
            type: String,
            required: true,
            minlength: 3,
            maxlength: 1024
        },
    },
    { timestamps: true }
);

module.exports = moongoose.model("User", userSchema);
