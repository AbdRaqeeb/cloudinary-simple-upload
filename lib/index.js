const { Pdf, Pdfs, Images, Image, files } = require('./upload');
const cfg = require('./config');

exports.uploadImages = Images;
exports.uploadImage = Image;
exports.uploadPdfs = Pdfs;
exports.uploadPdf = Pdf;
exports.config = cfg;
exports.uploadFiles = files;