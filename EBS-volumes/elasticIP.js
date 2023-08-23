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
        let ec2api = new AWS.EC2({
            region: regionName,
            accessKeyId: 'AKIATMWJY32RVMZA2TI6',
            secretAccessKey: '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'
        })

        let info = await ec2api.describeAddresses().promise()

        for (let address of info?.Addresses) {

            if (address.InstanceId === undefined) {
                console.log("Unattached elastic IPs :")
                // console.log(address)
                // console.log(" ", address.AllocationId)
                // console.log(" ", address.PublicIp)
                // console.log("REGION~", regionName)
                let csvParams = {
                    PublicIp: address.PublicIp,
                    AllocationId: address.AllocationId,
                    AssociationId: address.AssociationId,
                    Region: address.NetworkBorderGroup
                }
                console.log(csvParams)

            }
        }
    }
}

call()