const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWSAccessKeyId,
  secretAccessKey: process.env.AWSSecretKey,
});

const s3 = new AWS.S3();

module.exports = multer({
  storage: multerS3({
    s3,
    bucket: 'eatchic',
    acl: 'public-read',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: `image/${file.originalname}` });
    },
    key: (req, file, cb) => {
      cb(null, `image/${file.originalname}`);
    },
  }),
});