const AWS = require("aws-sdk");
const bytes = require("bytes");
const { convertCsvAndUpload } = require("./csvAndUpload/ToCSV");

AWS.config.update({
  region: "us-east-1",
  accessKeyId: "AKIATMWJY32RY2LHQGEB",
  secretAccessKey: "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",
});

async function call() {
  let s3 = new AWS.S3({
    region: "us-east-1",
    accessKeyId: "AKIATMWJY32RVMZA2TI6",
    secretAccessKey: "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",
  });
  var sts = new AWS.STS({
    region: "us-east-1",
    accessKeyId: "AKIATMWJY32RVMZA2TI6",
    secretAccessKey: "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",
  });
  const person = await sts.getCallerIdentity().promise();

  let bucket_details = await s3.listBuckets().promise();
  //console.log(bucket_details)
  console.log("Bucket details :~");
  console.log("-----------------------------------------------------");

  let results = [];
  let params1 = {
    AccountID: person.Account,
  };
  results.push(params1);

  for (let buckets of bucket_details?.Buckets) {
    // { //console.log(buckets.Name)
    let params = {
      Bucket: buckets.Name,
    };

    try {
      const objects = await s3.listObjectsV2(params).promise();
      //const accountID = ;
      let Total = 0;

      for (let contents of objects?.Contents) {
        //console.log(contents)
        // console.log("Size of each object:",contents.Size)
        Total += contents.Size;
      }
      let params2 = {
        Bucket: buckets.Name,
        Size: bytes(Total, { unitSeparator: " " }),
      };
      results.push(params2);

      console.log("Bucket name:", buckets.Name);
      console.log(
        "Total Size of the bucket-",
        buckets.Name,
        ":",
        bytes(Total, { unitSeparator: " " })
      ); // to give gap between number and unit
      console.log("Account ID", person.Account);
    } catch (error) {
      console.log("-----------------------------------------------------");
      console.log(`Error retriving objects for ${buckets.Name} : ${error}`);
      console.log("-----------------------------------------------------");
    }
    console.log("*******************************");
  }

  let resultCsv = await convertCsvAndUpload(results);

  // let resparams = {
  //     results,
  //     resultCsv
  // }
  //res.send(resparams)
}

call();
