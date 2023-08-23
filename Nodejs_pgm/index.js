const AWS= require('aws-sdk')
AWS.config.update({
    region: "us-east-1",
        accessKeyId: "AKIATMWJY32RY2LHQGEB",
        secretAccessKey: "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"
})

async function call () {
let ec2api = new AWS.EC2({
    region: "us-east-1",
    accessKeyId: 'AKIATMWJY32RVMZA2TI6',
    secretAccessKey: '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'
})

let rds = new AWS.RDS({
    region: "ap-southeast-2",
    accessKeyId: 'AKIATMWJY32RVMZA2TI6',
    secretAccessKey: '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'
})

let rdsDetails = await rds.describeDBInstances().promise()
console.log(rdsDetails)



// var params = {
//     Filters: [
//     {
//         Name: "block-device-mapping.status", 
//         Values: [  "attached"   ]
//     }
//               ]
//     };
// let info= await ec2api.describeInstances(params).promise();
// //console.log(info)

// let count=0

// // let results=[]
// for(let reservation of info?.Reservations)
//     for(let instances of reservation?.Instances)
//     {    console.log("Tags:",instances.Tags)
//         console.log("\n") 
//         console.log("Instance ID: ",instances.InstanceId)
        
//         for(let block of instances?.BlockDeviceMappings)
//          {      
//                console.log("Volume ID:",block.Ebs.VolumeId)
//                count++
//          }
//          console.log("******************************************************************************")
//         }
// console.log("Count:",count)

}

call()


