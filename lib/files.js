const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const files = async (files, folder, key) => {
    const urls = [];
    try {
        //image file path
        for (const file of files) {
            // Check for file extension
            const ext = path.extname(file.name);

            const audioFormat = ['.aac', '.aiff', '.amr', '.flac', '.m4a', '.mp3', '.ogg', '.opus', '.wav'];
            const videoFormat = ['.3g2', '.3gp', '.avi', '.flv', '.m3u8', '.ts', '.m2ts', '.mts', '.mov', '.mkv', '.mp4',
                '.mpeg', '.mpd', '.mxf', '.ogv', '.webm', '.wmv',
                '.ai', '.gif', '.webp'
            ];
            const imageFormat = ['.avif', '.bmp', '.djvu', '.ps', '.ept',
                '.eps', '.eps3', '.fbx', '.flif', '.gif', '.glb', '.gltf', '.heif', '.heic', '.ico',
                '.indd', '.jpg', '.jpe', '.jpeg', '.jp2', '.wdp', '.jxr', '.hdp', '.png', '.psd', '.arw', '.cr2',
                '.svg', '.tga', '.tif', '.tiff', '.webp'
            ];

            if (audioFormat.includes(ext) !== true && imageFormat.includes(ext) !== true && videoFormat.includes(ext) !== true) {
                throw Error('file format is not supported')
            }

            const filePath = `${__dirname}${file.name}`;

            //move file to the file directory
            await file.mv(filePath);

            const type = (imageFormat.includes(ext) ? 'image' : (audioFormat.includes(ext)) ? 'raw' : 'video');

            //upload file
            const result = await cloudinary.uploader.upload(filePath, {
                folder: folder,
                resource_type: type
            }, (err) => {
                if (err) {
                    // Delete image on server after upload
                    fs.unlinkSync(filePath);
                }
            });

            // Delete file on server after upload
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

module.exports = {
    files
};
