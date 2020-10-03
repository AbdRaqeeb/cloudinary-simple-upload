const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const Audio = async (audio, folder, key, me) => {
    // key is added to return single url as array for single audio upload
    const url = [];
    try {
        let audioFile = audio;

        // Check for file extension
        const ext = path.extname(audioFile.name);

        const fileFormat = ['.aac', '.aiff', '.amr', '.flac', '.m4a', '.mp3', '.ogg', '.opus', '.wav'];


        if (fileFormat.includes(ext) !== true) {
            throw Error('file is not an audio');
        }

        //audio file path
        const filePath = `${__dirname}/${audioFile.name}`;

        //move audio to the photo directory
        await audioFile.mv(filePath);

        //upload audio
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder,
            resource_type: 'raw'
        }, (err) => {
            if (err) {
                // Delete audio on server
                fs.unlinkSync(filePath);
            }
        });

        // Delete audio on server after upload
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

const Audios = async (audios, folder, key) => {
    const urls = [];

    try {
        for (const audio of audios) {


            // Check for file extension
            const ext = path.extname(audio.name);

            const fileFormat = ['aac', 'aiff', 'amr', 'flac', 'm4a', 'mp3', 'ogg', 'opus', 'wav'];


            if (fileFormat.includes(ext) !== true) {
                throw Error('file is not a audio');
            }

            //audio file path
            const filePath = `${__dirname}/${audio.name}`;

            //move audio to the photo directory
            await audio.mv(filePath);

            //upload audio
            const result = await cloudinary.uploader.upload(filePath, {
                folder: folder,
                resource_type: 'raw'
            }, (err) => {
                if (err) {
                    // Delete audio on server
                    fs.unlinkSync(filePath);
                }
            });

            // Delete audio on server after upload
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
    Audio,
    Audios
};

