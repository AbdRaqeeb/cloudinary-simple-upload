const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
require('dotenv').config();

app.use(express.json({
    extended: false
}));
app.use(fileUpload());

const {
    config,
    uploadPdf,
    uploadPdfs,
    uploadImage,
    uploadImages,
    uploadFiles,
    uploadAudio,
    uploadAudios,
    uploadVideo,
    uploadVideos,
    deleteImages,
    deleteImage
} = require('../index');

// keys stored in environmental variables
config(process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRET);

app.post('/upload', async (req, res) => {
    if (!req.files) {
        return res.status(400).json({
            msg: 'upload image'
        });
    }

    try {
        const files = await uploadImages(req.files.file, "test");

        res.status(201).json({
            msg: 'Success',
            files
        });
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server error...')
    }
});

app.post('/delete', async (req, res) => {
    if (!req.body.public_id) {
        return res.status(400).json({
            msg: 'Please upload image public_id'
        })
    }

    try {
        const result = await deleteImage(req.body.public_id);

        res.status(200).json(result);        
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server error...')
    }
});

app.post('/delete/multiple', async (req, res) => {
    if (!req.body.public_id) {
        return res.status(400).json({
            msg: 'Please upload image public_ids'
        })
    }

    try {
        const result = await deleteImages(req.body.public_id);

        res.status(200).json(result);
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server error...')
    }
});


app.get('/', (req, res) => {
    res.status(200).send('Welcome to cloudinary-simple-upload');
});

const PORT = 6565;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});