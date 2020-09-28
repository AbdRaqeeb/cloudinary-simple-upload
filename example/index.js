const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');

app.use(express.json({ extended: false }));
app.use(fileUpload());

const {config, uploadPdf, uploadPdfs, uploadImage, uploadImages, uploadFiles } = require('../index');

// keys stored in environmental variables
config(process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRET);

app.post('/upload', async (req, res) => {
    if (!req.files) {
        return res.status(400).json({
            msg: 'upload image'
        });
    }

    const files = await uploadImage(req.files.file, "test");

   res.status(201).json({
       msg: 'Success',
       files
   });
});

const PORT = 6565;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});
