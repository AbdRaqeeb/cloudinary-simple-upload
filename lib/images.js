const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const Image = async (image, folder, key) => {
    // key is added to return single url as array for single image upload
    const url = [];
    try {
        let imageFile = image;

        const fileFormat = ['.ai', '.gif', '.webp', '.avif', '.bmp', '.djvu', '.ps', '.ept',
        '.eps', '.eps3', '.fbx', '.flif', '.gif', '.glb', '.gltf', '.heif', '.heic', '.ico',
        '.indd', '.jpg', '.jpe', '.jpeg', '.jp2', '.wdp', '.jxr', '.hdp', '.png', '.psd', '.arw', '.cr2',
        '.svg', '.tga', '.tif', '.tiff', '.webp'];

        // Check for file extension
        const ext = path.extname(imageFile.name);


        if (fileFormat.includes(ext) !== true) {
            throw Error('file is not an image');
        }

        //image file path
        const filePath = `${__dirname}/${imageFile.name}`;

        //move image to the photo directory
        await imageFile.mv(filePath);

        //upload image
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder
        }, (err) => {
            if (err) {
                // Delete image on server after upload
                fs.unlinkSync(filePath);
            }
        });

        // Delete image on server after upload
        fs.unlinkSync(filePath);

        if (key === 'own') {
            url.push(result.secure_url);
            return url;
        }

        if (key === 'owner') {
            return result.secure_url;
        }

        // return single url as an array
        if (key) {
            url.push(result);
            return url;
        }

        return result;
    } catch (e) {
        throw e;
    }
};

const Images = async (images, folder, key) => {
    const urls = [];

    try {
        for (const image of images) {


            // Check for file extension
            const ext = path.extname(image.name);

            if ((ext !== '.jpeg') && (ext !== '.JPEG') && (ext !== '.jpg') && (ext !== '.JPG') && (ext !== '.png') && (ext !== '.PNG')) {
                throw Error('file is not an image');
            }

            //image file path
            const filePath = `${__dirname}/${image.name}`;

            //move image to the photo directory
            await image.mv(filePath);

            //upload image
            const result = await cloudinary.uploader.upload(filePath, {
                folder: folder
            }, (err) => {
                if (err) {
                    // Delete image on server after upload
                    fs.unlinkSync(filePath);
                }
            });

            // Delete image on server after upload
            fs.unlinkSync(filePath);

            if (key) {
                urls.push(result.secure_url);
            } else {
                urls.push(result);
            }
        }

        return urls;
    } catch (e) {
        throw e;
    }
};

const deleteImageFile = async (public_id) => {

    try {
         //delete image
        return await cloudinary.uploader.destroy(public_id);
    } catch (e) {
       throw e;
    }
       
};

const deleteImageFiles = async (public_ids) => {
    
    try {
        let result;
        for (const public_id of public_ids) {
            result = await cloudinary.uploader.destroy(public_id);
        }
         
        return result;
    } catch (e) {
        throw e;
    }
};

module.exports = {
    Image,
    Images,
    deleteImageFile,
    deleteImageFiles
};
