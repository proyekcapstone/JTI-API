const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const config = require('./config');

cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async () => {
        return {
            folder: 'jti',
            transformation: {
                quality: 75,
            },
        };
    }
});

const uploadImg = multer({ storage: storage });

module.exports = uploadImg;