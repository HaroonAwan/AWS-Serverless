const im = require('imagemagick')
const fs = require('fs')
const os = require('os')
const uui4 = require('uuid/v4')
const {promisify} = require('util')
const AWS = require('aws-sdk')

const resizeAsync = promisify(im.resize);
const readFileAsync = promisify(fs.readFile);
const unlinkAsync = promisify(fs.unlink);

AWS.config.update({ region: 'us-west-1' })

const s3 = new AWS.S3();

exports.handler = async(event) => {
     const processedImages = event.Records.map(async (record) => {
         // process files
         const bucket = record.s3.bucket.name;
         const imageName = record.s3.object.key;

         // get image from s3
          const inputImageData = await s3.getObject({
              Bucket: bucket,
              Key: imageName
          }).promise()

         // resize
         let tempImage = os.tempdir() + '/' + uui4() + '.jpg';
          let resizeArgs = {
              srcData: inputImageData.Body,
              dstPath: tempImage,
              width: 150
          }
          await resizeAsync(resizeArgs);

         // read resized
         let resizeData = await readFileAsync(tempImage);

         // upload resized
         let targetImageName = imageName.substring(0, imageName.lastIndexOf('.')) + '-small.jpg';
         let params = {
             Bucket: bucket,
             Key: targetImageName,
             Body: new Buffer(resizeData),
             ContentType: 'image/jpeg'
         };

         await s3.putObject(params).promise();
         return await unlinkAsync(tempImage);
     });

     await Promise.all(processedImages);
     console.log("Done");
     return "Done";
}