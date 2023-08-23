const AWS = require('aws-sdk')


async function call() {
    const regionList = [
        { regionCode: "ap-southeast-2" },
        { regionCode: "us-west-2" },
        { regionCode: "us-east-2" },
        { regionCode: "us-west-1" },
        { regionCode: "ap-south-1" },
        { regionCode: "us-east-1" }
    ]
    let nextToken = null
    for (const { regionCode: regionName } of regionList) {
        let length = 0
        let results = []

        AWS.config.update({
            region: regionName,
            accessKeyId: 'AKIATMWJY32RVMZA2TI6',
            secretAccessKey: '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'
        })

        const cloudwatchLogs = new AWS.CloudWatchLogs();
        do {
            const params = {
                nextToken: nextToken
            };

            const logGroups = await cloudwatchLogs.describeLogGroups(params).promise();

            for (const logGroup of logGroups.logGroups) {
                results.push(logGroup.arn);
                length = length + 1

            }

            nextToken = logGroups.nextToken;
        } while (nextToken);

        console.log(results);
        console.log("length", length)
    }



}

call()
