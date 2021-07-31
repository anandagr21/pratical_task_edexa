const moongoose = require("mongoose");

const profileSchema = new moongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
        index: true,
    },
    address: {
        type: String,
        required: 'Address is required'
    },
    age: {
        type: Number,
        required: 'Age is required'
    },
    image: {
        type: Array
    }
}, { timestamps: true });

module.exports = moongoose.model('Profile', profileSchema);