const Profile = require("../models/profile")
const cloudinary = require("cloudinary");
const { v4: uuidv4 } = require('uuid');

// config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.createProfile = async (req, res) => {
    try {
        const savedImage = await uploadToCloudnary(req.body.image)
        const newProfile = await new Profile({ name: req.body.name, address: req.body.address, age: req.body.age, image: savedImage })
            .save()
        res.json(newProfile)
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
}

const uploadToCloudnary = async (image) => {
    let result = await cloudinary.uploader.upload(image, {
        public_id: `${Date.now()}`,
        resource_type: "auto", //jpg, png
    });

    return ({
        public_id: result.public_id,
        url: result.secure_url,
    });
}
