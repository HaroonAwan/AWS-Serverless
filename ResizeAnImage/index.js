const sharp = require('sharp')
const AWS = require('aws-sdk')

AWS.config.update({region: 'us-west-1'})

const s3 = new AWS.S3();

exports.handler = async (event) => {
    // process files
    const bucket = event.s3.bucket.name;
    const imageName = event.s3.object.key;

    // get image from s3
    const inputImageData = await s3.getObject({
        Bucket: bucket,
        Key: imageName
    }).promise();

    const resizedImageBuffer = await sharp(inputImageData.Body).resize({height: 150, width: 150}).toBuffer();

    // upload resized
    let targetImageName = imageName.substring(0, imageName.lastIndexOf('.')) + '-small.jpg';
    const destinationBucket = bucket + '-dest';
    let params = {
        Bucket: destinationBucket,
        Key: targetImageName,
        Body: new Buffer(resizedImageBuffer),
        ContentType: 'image/jpeg'
    };

    await s3.putObject(params).promise();
    return {
        region: "us-west-1",
        destination: destinationBucket,
        key: imageName
    };
}
