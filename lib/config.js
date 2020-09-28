const cloudinary = require('cloudinary').v2;

const Cloudinary = async (cloud, key, secret) => {
    await cloudinary.config({
        cloud_name: cloud,
        api_key: key,
        api_secret: secret
    });
};

module.exports = Cloudinary;