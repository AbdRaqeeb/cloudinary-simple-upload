const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

const Pdf = async (pdf, folder, key) => {
    // key is added to return single url as array for single pdf upload
    const url = [];
    try {
        let pdfFile = pdf;

        // Check for file extension
        const ext = path.extname(pdfFile.name);

        if ((ext !== '.pdf')) {
            throw Error('file is not a pdf');
        }

        //pdf file path
        const filePath = `${__dirname}/${pdfFile.name}`;

        //move pdf to the file directory
        await pdfFile.mv(filePath);

        //upload pdf
        const result = await cloudinary.uploader.upload(filePath, {
            folder: folder
        }, (err) => {
            if (err) {
                // Delete pdf on server
                fs.unlinkSync(filePath);
            }
        });

        // Delete pdf on server after upload
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

        return result
    } catch (e) {
        throw e;
    }
};

const Pdfs = async (pdfs, folder, key) => {
    const urls = [];

    try {
        for (const pdf of pdfs) {

            // Check for file extension
            const ext = path.extname(pdf.name);

            if ((ext !== '.pdf')) {
                throw Error('file is not a pdf');
            }

            //pdf file path
            const filePath = `${__dirname}/${pdf.name}`;

            //move pdf to the photo directory
            await pdf.mv(filePath);

            //upload pdf
            const result = await cloudinary.uploader.upload(filePath, {
                folder: folder
            }, (err) => {
                if (err) {
                    // Delete pdf on server
                    fs.unlinkSync(filePath);
                }
            });

            // Delete pdf on server after upload
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
    Pdf,
    Pdfs
};
