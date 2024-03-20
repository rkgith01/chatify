import AWS from "aws-sdk";
import fs from "fs";

export const downloadFroms3 = async (file_key: string) => {
  try {
    AWS.config.update({
        accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY!,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_KEY!,
    //   credentials: {
    //   },
    });
    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      },
      region: "ap-southeast-1", 
    });
    const params = {
      Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME!,
      Key: file_key,
    };
    const obj = await s3.getObject(params).promise();
    const file_name = `./temp/chatify-${Date.now()}.pdf`; // Use a valid path
    fs.writeFileSync(file_name, obj.Body as Buffer);

    return file_name;
  } catch (error) {
    console.error(error);
  }
};
