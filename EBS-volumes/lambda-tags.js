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
    //let checkKeyList = ["ApplicationCode", "CostCenter"]
    const applicationNames = {}
    for (const { regionCode: regionName } of regionList) {
        let lambda = new AWS.Lambda({
            region: regionName,
            accessKeyId: 'AKIATMWJY32RVMZA2TI6',
            secretAccessKey: '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'
        })

        // let info = await lambda.listFunctions().promise()
        // for (let fn of info.Functions) {
        //     const arn = fn.FunctionArn
        //     //console.log(arn)
        //     const tagsData = await lambda.listTags({ Resource: arn }).promise();
        //     const tags = tagsData.Tags || [];

        //     results.push({
        //         FunctionName: fn.FunctionName,
        //         Tags: tags
        //     });
        //    // results.push(arn)
        // }
        let results = []

        let info = await lambda.listFunctions().promise()
        for (let fn of info?.Functions) {
            let arn = fn.FunctionArn
            let tagsData = await lambda.listTags({ Resource: arn }).promise();
            //console.log(tagsData.Tags.ApplicationName)
            if (tagsData.Tags.ApplicationName != undefined) {
                const appName = tagsData.Tags.ApplicationName
                //console.log(appName)
                applicationNames[appName] = (applicationNames[appName] || 0) + 1

                let csvParams = {
                    //Account: accountId,
                    RunTime: fn.Runtime,
                    CodeSize: fn.CodeSize,
                    MemorySize: fn.MemorySize,
                    Function: fn.FunctionName,
                    ARN: arn,
                    Region: regionName,
                    AppName: tagsData.Tags.ApplicationName,
                    AppCode: tagsData.Tags.ApplicationCode,
                    CostCenter: tagsData.Tags.CostCenter
                }
                //let finalParams = { ...csvParams, ...reduceObj }
                results.push(csvParams)
                // console.log(csvParams)

            }
        }
        console.log(results)
        console.log("Number:", results.length)
    }
    console.log(applicationNames)

}

call()