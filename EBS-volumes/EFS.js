const AWS = require('aws-sdk')

AWS.config.update = ({
    region: "us-east-1",
    accessKeyId: "AKIATMWJY32RY2LHQGEB",
    secretAccessKey: "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"
})

async function call() {
    const regionList = [
        { regionCode: "ap-southeast-2" },
        { regionCode: "us-west-2" },
        { regionCode: "us-east-2" },
        { regionCode: "us-west-1" },
        { regionCode: "ap-south-1" },
        { regionCode: "us-east-1" }
    ]
    for (const { regionCode: regionName } of regionList) {
        let efsapi = new AWS.EFS({
            region: regionName,
            accessKeyId: 'AKIATMWJY32RVMZA2TI6',
            secretAccessKey: '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'
        })

        let results = []
        let info = await efsapi.describeFileSystems().promise()
        //console.log( info )
        for (let file of info?.FileSystems) {
            //console.log(file)
            for (let tag of file?.Tags) {
                let items = {
                    EFS: file.Name,
                    ARN: file.FileSystemArn,
                    LifeCycleState: file.LifeCycleState,
                    //Found : file.Tags
                }
                console.log(file.Tags)
                results.push(items)
            }
        }
        console.log(results)

    }
}

call()