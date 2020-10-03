Fast, easy, package to upload files (images or pdf) to cloudinary.

## Getting started

### Installation

```
npm i cloudinary-simple-upload
```

or

```
yarn add cloudinary-simple-upload
```

#### Basic Usage
First require <a href="https://www.npmjs.com/package/express">express</a> and <a href="https://www.npmjs.com/package/express-fileupload">express-fileupload</a> for receiving file requests.<br>
Add your cloudinary cloud_name, api_key and api_secret. Register here <a href="https://cloudinary.com">cloudinary</a> for your cloudinary credentials.

  
```js
//  Index.js
const express = require('express');
const fileUpload = require('express-fileupload');
const {config} = require('cloudinary-simple-upload');

const app = express();
app.use(express.json({ extended: false }));
app.use(fileUpload());

config(process.env.CLOUD_NAME, process.env.API_KEY, process.env.API_SECRET);

app.get('/', function (req, res) {
  res.send('Upload')
});

app.listen(3300);
```

i. Upload a single image
```js
// upload js
const {uploadImage} = require('cloudinary-simple-upload');

app.post('/upload', async (req, res) => {
    if (!req.files) {
        return res.status(400).json({
            msg: 'please upload an image'
        });
    }
   
    try {
        // The name of the input field (i.e. "newFile") is used to retrieve the uploaded file
        let newFile = req.files.newFile;
       
        // "test" is the name of folder the uploaded image will be stored in cloudinary.
        const files = await uploadImage(newFile, "test");
    
       res.status(201).json({
           msg: 'Success',
           files
       });
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server error...');
    }
    
});
```

Below is an example of uploaded result
```js
{
        "asset_id": "5cc595d80e78f4088988a8bc490ee9f7",
        "public_id": "test/sav1qegnzxsgxzabow2m",
        "version": 1601302143,
        "version_id": "eda87109f052cf9951844629f538f3a0",
        "signature": "8756cede85a23c62793dc5229ddb151ff6091a21",
        "width": 1200,
        "height": 1177,
        "format": "jpg",
        "resource_type": "image",
        "created_at": "2020-09-28T14:09:03Z",
        "tags": [],
        "bytes": 546268,
        "type": "upload",
        "etag": "4e3ac42ce120bc5503987c1b4687be96",
        "placeholder": false,
        "url": "http://res.cloudinary.com/abdraqeeb/image/upload/v1601302143/test/sav1qegnzxsgxzabow2m.jpg",
        "secure_url": "https://res.cloudinary.com/abdraqeeb/image/upload/v1601302143/test/sav1qegnzxsgxzabow2m.jpg",
        "original_filename": "image1601302140586"
    }
```

ii. Upload Multiple Images
```js
//pdf.js
const {uploadImages} = require('cloudinary-simple-upload');

app.post('/upload', async (req, res) => {
    if (!req.files || Object.keys(req.files).length < 2) {
        return res.status(400).json({
            msg: 'please upload multiple images'
        });
    }
    
    try {
         // The name of the input field (i.e. "newFile") is used to retrieve the uploaded files
            let newFiles = req.files.newFiles;
            
            // "test" is the name of folder the uploaded image will be stored in cloudinary.
            const files = await uploadImages(newFiles, "test");
        
           res.status(201).json({
               msg: 'Success',
               files
           });
    } catch (e) {
        console.log(e);
        res.status(500).send('Internal server error');
    }
   
});
```

iii. Upload PDF
```js
// upload js
const {uploadPdf} = require('cloudinary-simple-upload');
...
```

iv. Upload multiple pdfs
```js
// upload js
const {uploadPdfs} = require('cloudinary-simple-upload');
...
```

v.  Upload single video
```js
// upload js
const {uploadVideo} = require('cloudinary-simple-upload');
...
```

vi.  Upload multiple videos
```js
// upload js
const {uploadVideos} = require('cloudinary-simple-upload');
...
```

vii.  Upload audio
```js
// upload js
const {uploadAudio} = require('cloudinary-simple-upload');
...
```

viii.  Upload multiple audios
```js
// upload js
const {uploadAudios} = require('cloudinary-simple-upload');
...
```

ix. Upload multiple files of images, videos, audios and pdfs together
```js
// upload js
const {uploadFiles} = require('cloudinary-simple-upload');
...
```

#### Options
* key: return single file uploads as an array of object, value can be any string.
```js
    // returns upload response as an array of object
    const file = await uploadPdf(newFile, "test", "array");
```

#### Licensing
[MIT](LICENSE)

#### Author
<a href="https://github.com/AbdRaqeeb">Ajao AbdRaqeeb</a>