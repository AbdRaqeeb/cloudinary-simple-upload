const { Pdf, Pdfs} = require('./pdf');
const {Images, Image} = require('./images');
const {files} = require('./files');
const {Audio, Audios} = require('./audio');
const {Video, Videos} = require('./video');
const cfg = require('./config');

exports.uploadImages = Images;
exports.uploadImage = Image;
exports.uploadPdfs = Pdfs;
exports.uploadPdf = Pdf;
exports.uploadVideo = Video;
exports.uploadVideos = Videos;
exports.uploadAudios = Audios;
exports.uploadAudio = Audio;
exports.config = cfg;
exports.uploadFiles = files;