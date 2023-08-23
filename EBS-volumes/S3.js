const AWS = require('aws-sdk')
const { convertCsvAndUpload } = require('./csvAndUpload/ToCSV')

AWS.config.update({
    region: "us-east-1",
    accessKeyId: "AKIATMWJY32RY2LHQGEB",
    secretAccessKey: "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"
})

async function call() {

    let s3 = new AWS.S3({
        region: "us-east-1",
        accessKeyId: 'AKIATMWJY32RVMZA2TI6',
        secretAccessKey: '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'
    })
    var sts = new AWS.STS({
        region: "us-east-1",
        accessKeyId: 'AKIATMWJY32RVMZA2TI6',
        secretAccessKey: '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'
    });
    const person = await sts.getCallerIdentity().promise()


    let bucket_details = await s3.listBuckets().promise()
    //console.log(bucket_details)
    console.log("Bucket details :~")
    console.log("-----------------------------------------------------")

    let results = []
    let found = []
    let final = []
    let empty = []


    //tagDetailsPerRegion[region.RegionName] = [];

    for (const bucket of bucket_details.Buckets) {
        //console.log(bucket)
        try {
            var params = {
                Bucket: bucket.Name
            }
            //let name = bucket.BucketName
            const bucketTags = await s3.getBucketTagging(params).promise();
            //results.push(bucketTags.TagSet)
            const tags = bucketTags.TagSet || [];
            results.push({
                BucketName: bucket.Name,
                // Tags: tags
            })


            for (let tag of bucketTags?.TagSet) {
                if (typeof tag.Value === 'object' && tag.Value !== null) {
                    console.log('Tag Value Key:', tag.Value.Key);
                    console.log('Tag Value Value:', tag.Value.Value);
                } else {
                    // console.log("Tag Key:", tag.Key)
                    // console.log('Tag Value:', tag.Value);
                    results.push({
                        key: tag.Key,
                        value: tag.Value
                    })
                }
            }
            //let combine = { ...results, ...item }
            //  final.push(combine)
            bucketTags.TagSet.forEach(tag => {
                // console.log('Tag Key:', tag.Key);
                // console.log('Tag Value:', tag.Value);
                found.push({
                    BucketName: bucket.Name,
                    Key: tag.Value.Key,
                    Value: tag.Value.Value
                })

            });

            // let combine = { ...results, ...found }
            // final.push(combine)
            console.log("------------------------------------------------------")

        }

        catch (err) {
            if (err.code !== 'NoSuchTagSet') {
                throw err; // Re-throw the error if it's not the NoSuchTagSet error
            }
            empty.push({
                BucketName: bucket.Name,
                Tags: []
            });
            continue;
  
        }
    }
    console.log(results)
    //console.log(final)


    // let resultCsv = await convertCsvAndUpload(final)

    // let resparams = {
    //     results,
    //     resultCsv
    // }
    //res.send(resparams)

}

call()