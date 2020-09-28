const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');


const Image = async (image, folder, key) => {
    // key is added to return single url as array for single image upload
    const url = [];
    try {
        let imageFile = image;

        //image file path
        const filePath = `${__dirname}/image${Date.now()}.jpg`;

        //move image to the photo directory
        await imageFile.mv(filePath);

        //upload image
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder
        });

        // Delete image on server after upload
        fs.unlinkSync(filePath);

        // return single url as an array
        if (key) {
            url.push(result);
            return url;
        }

        return result;
    } catch (e) {
        console.error(e.message);
    }
};

const Images = async (images, folder) => {
    const urls = [];

    try {
        let imageFiles = images;

        //image file path
        const filePath = `${__dirname}/image${Date.now()}.jpg`;

        for (const image of imageFiles) {

            //move image to the photo directory
            await image.mv(filePath);

            //upload image
            const result = await cloudinary.uploader.upload(filePath, {
                folder: folder
            });

            // Delete image on server after upload
            fs.unlinkSync(filePath);

            urls.push(result);
        }

        return urls;
    } catch (e) {
        console.error(e.message)
    }
};

const Pdf = async (pdf, folder, key) => {
    // key is added to return single url as array for single image upload
    const url = [];
    try {
        let pdfFile = pdf;

        //image file path
        const filePath = `${__dirname}/pdf${Date.now()}.pdf`;

        //move pdf to the file directory
        await pdfFile.mv(filePath);

        //upload pdf
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder
        });

        // Delete pdf on server after upload
        fs.unlinkSync(filePath);

        // return single url as an array
        if (key) {
            url.push(result);
            return url;
        }

        return result
    } catch (e) {
        console.error(e.message)
    }
};

const Pdfs = async (pdfs, folder) => {
    const urls = [];

    try {
        let pdfFiles = pdfs;

        //pdf file path
        const filePath = `${__dirname}/pdf${Date.now()}.pdf`;

        for (const pdf of pdfFiles) {
            //move image to the photo directory
            await pdf.mv(filePath);

            //upload image
            const result = await cloudinary.uploader.upload(filePath, {
                folder: folder
            });

            // Delete image on server after upload
            fs.unlinkSync(filePath);

            urls.push(result);
        }

        return urls;
    } catch (e) {
        console.error(e.message)
    }
};

const files = async (files, folder) => {
    const urls = [];
    try {
        //image file path
        for (const file of files) {
            // Check for file extension
            const ext = path.extname(file.name);

            const filePath = ext === '.jpg' || '.jpeg' || '.png' ? `${__dirname}/image${Date.now()}.jpg` : `${__dirname}/pdf${Date.now()}.pdf`;

            //move file to the file directory
            await file.mv(filePath);

            //upload file
            const result = await cloudinary.uploader.upload(filePath, {
                folder: folder
            });

            // Delete file on server after upload
            fs.unlinkSync(filePath);
            urls.push(result);
        }
        return urls;
    } catch (e) {
        console.error(e.message)
    }
};

module.exports = {
    Image,
    Images,
    Pdf,
    Pdfs,
    files
};
