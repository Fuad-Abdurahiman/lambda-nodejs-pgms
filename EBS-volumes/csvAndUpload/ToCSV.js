const AWS = require('aws-sdk')
const converter = require('json2csv');

async function convertCsvAndUpload(completeList) {
    // covert json to csv     
    let csv = converter.parse(completeList)


    // upload csv to s3 bucket and get the bucket details     

    let currentTime = new Date().getTime()
    let filename = `Bucket_Details_${currentTime}.csv`

    // let date = new Date().getDate()
    // let hours = new Date().getHours()
    // let minutes = new Date().getMinutes()
    // let filename = `Details_${date}_${hours}_${minutes}.csv` 
    console.log("filename", filename)
    let s3 = new AWS.S3({
        region: "us-east-1",
        accessKeyId: 'AKIATMWJY32RVMZA2TI6',
        secretAccessKey: '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'
    });

    try {
        let params = {
            Bucket: 'bucket-reportzz',
            Key: filename,
            Body: csv

        }
        const resp = await s3.upload(params).promise()
        console.log(resp)
        return resp


    } catch (e) {
        console.log("errrr", e)
    }
}

module.exports.convertCsvAndUpload = convertCsvAndUpload