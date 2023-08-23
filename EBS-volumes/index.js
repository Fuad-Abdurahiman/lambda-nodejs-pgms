const AWS = require('aws-sdk')
AWS.config.update({
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
        let ec2api = new AWS.EC2({
            region: regionName,
            accessKeyId: 'AKIATMWJY32RVMZA2TI6',
            secretAccessKey: '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'
        })

        // let rds = new AWS.RDS({
        //     region: "ap-southeast-2",
        //     accessKeyId: 'AKIATMWJY32RVMZA2TI6',
        //     secretAccessKey: '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'
        // })

        // let rdsDetails = await rds.describeDBInstances().promise()
        // console.log(rdsDetails)



        var params = {
            Filters: [
                {
                    Name: "tag-key",
                    Values: ["ApplicationName"]
                }
            ]
        };
        let info = await ec2api.describeInstances().promise();
        //console.log(info)

        // let count = 0

        // let results = []
        // const applicationNames = {};
        for (let reservation of info?.Reservations){
            console.log(reservation)
        }
        //     for (let instances of reservation?.Instances) {
                //console.log(instances)
                // for (let tag of instances?.Tags) {
                //     //ApplicationName = "test"
                //     // if(tag.Value.includes('abhi') || tag.Value == ApplicationName )
                //     //console.log("TTTTTT",tag.Value)
                //     if (tag.Key == "ApplicationName") {
                //         const appName = tag.Value;
                //         applicationNames[appName] = (applicationNames[appName] || 0) + 1;

                //         //console.log(tag.Key)
                //         //console.log( tag.Value)
                //         let csvParams = {
                //             Id: instances.InstanceId,
                //             Region: regionName,
                //             AppName: tag.Value
                        // }
                //         results.push(csvParams)
                //     }
                // }


                //if(instances.Tags.includes("test-fd")){
                //  console.log("Tags:",instances.Tags)
                // }
                // console.log("\n") 
                // console.log("Instance ID: ",instances.InstanceId)

                // for(let block of instances?.BlockDeviceMappings)
                //  {      
                //        console.log("Volume ID:",block.Ebs.VolumeId)
                //        count++
        //         //  }
        //         console.log("******************************************************************************")
        //     }
        // console.log(applicationNames)
        // console.log(results)
        //console.log("Count:", count)

    }
}

call()


