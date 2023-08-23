const AWS = require('aws-sdk')
AWS.config.update({
    region: "us-east-1",
    accessKeyId: 'AKIATMWJY32RVMZA2TI6',
    secretAccessKey: '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'
})

// exports.handler = async(event)
// {
//     var s3 = new AWS.S3

// }

async function call() {
    let results = []
    var s3 = new AWS.S3
    let params = {
        Bucket: "bucket-reportzz"
    }
    let objInfo = await s3.listObjectsV2(params).promise()
    //console.log(objInfo)
    for (let contents of objInfo?.Contents) {

        const check = ["Copy","/","Margetta",]
        const found = check.some((checkName) => {
            return contents.Key.toLowerCase().includes(checkName)
        })
        
        if (found)
            // console.log("Key::~",contents.Key)
            results.push(contents.Key)
        else {
            let filename = `test-wu-fd/Copy_${contents.Key}`
            console.log("Filename:", filename)
            try {
                let params = {
                    Bucket: "bucket-reportzz",
                    CopySource: `/bucket-reportzz/${contents.Key}`,
                    Key: filename

                }
                const post = await s3.copyObject(params).promise()
                console.log(post)
            }
            catch (e) {
                console.log("ERROR:", e)
            }
        }
    }
    console.log("Final output", results)

}

call()