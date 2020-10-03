const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const Video = async (video, folder, key) => {
    // key is added to return single url as array for single video upload
    const url = [];
    try {
        let videoFile = video;

        // Check for file extension
        const ext = path.extname(videoFile.name);

        const fileFormat = ['.3g2', '.3gp', '.avi', '.flv', '.m3u8', '.ts', '.m2ts', '.mts', '.mov', '.mkv', '.mp4',
            '.mpeg', '.mpd', '.mxf', '.ogv', '.webm', '.wmv'];


        if (fileFormat.includes(ext) !== true) {
            throw Error('file is not a video');
        }

        //video file path
        const filePath = `${__dirname}/${videoFile.name}`;

        //move video to the photo directory
        await videoFile.mv(filePath);

        //upload video
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: 'video',
            folder: folder
        }, (err) => {
            if (err) {
                // Delete video on server
                fs.unlinkSync(filePath);
            }
        });

        // Delete video on server after upload
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

const Videos = async (videos, folder, key) => {
    const urls = [];

    try {
        for (const video of videos) {


            // Check for file extension
            const ext = path.extname(video.name);

            const fileFormat = ['.3g2', '.3gp', '.avi', '.flv', '.m3u8', '.ts', '.m2ts', '.mts', '.mov', '.mkv', '.mp4',
                '.mpeg', '.mpd', '.mxf', '.ogv', '.webm', '.wmv'];


            if (fileFormat.includes(ext) !== true) {
                throw Error('file is not a video');
            }

            //video file path
            const filePath = `${__dirname}/${video.name}`;

            //move video to the photo directory
            await video.mv(filePath);

            //upload video
            const result = await cloudinary.uploader.upload(filePath, {
                folder: folder,
                resource_type: 'video'
            }, (err) => {
                if (err) {
                    // Delete video on server
                    fs.unlinkSync(filePath);
                }
            });

            // Delete video on server after upload
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
    Video,
    Videos
};