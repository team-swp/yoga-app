require("dotenv").config();
const express = require("express");

const crypto = require("crypto");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");
const randomImageName = (bytes = 32) => crypto.randomBytes(16).toString("hex");
const sharp = require("sharp");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { log } = require("console");

const secretAccessKey = process.env.SECRET_ACCESS_KEY;
const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretAccessKey,
  },
  region: bucketRegion,
});

//set image for avatar
module.exports.postImage = async (req, res) => {
try {
  if(req.file.mimetype.startsWith('image/')){ 
  const buffer = await sharp(req.file.buffer).resize({ height: 500, width: 500, fit: "contain" }).toBuffer();
  const imageName =req.body.imageName|| randomImageName();
  const params = {
    Bucket: bucketName,
    Key: imageName,
    Body: buffer,
    ContentType: req.file.mimetype,
  };
  const command = new PutObjectCommand(params);
  s3.send(command);
  res.send({ imageName }); 
}
} catch (error) {
  return res.status(404).send({ error: "Authentication Error"});
}
};

//getImage for avatar
module.exports.getImage = async(req,res)=>{
  const { imageName } = req.query;
  const getObjectParams = {
    Bucket: bucketName,
    Key: imageName,
  };
  const command = new GetObjectCommand(getObjectParams);
  const url = await getSignedUrl(s3, command, { expiresIn: 3600*24*6 });
  res.send({ url });
}