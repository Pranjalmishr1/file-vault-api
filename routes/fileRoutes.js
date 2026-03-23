const express = require("express");
const router = express.Router();
const multer = require("multer");
const File = require("../models/File");
const fs = require("fs");

const storage = multer.diskStorage({
destination: (req, file, cb)=>{
cb(null,"uploads/");
},
filename: (req, file, cb)=>{
cb(null, Date.now()+"-"+file.originalname);
}
});

const upload = multer({ storage });

router.post("/", upload.single("file"), async(req,res)=>{
try{

const newFile = new File({
name:req.file.originalname,
size:req.file.size,
type:req.file.mimetype,
path:req.file.path
});

await newFile.save();

res.json({
message:"File uploaded successfully",
file:newFile
});

}catch(err){

res.status(500).json({error:err.message});

}
});

router.get("/", async(req,res)=>{
try{

const files = await File.find();

res.json(files);

}catch(err){

res.status(500).json({error:err.message});

}
});

router.delete("/:id", async(req,res)=>{
try{

const file = await File.findById(req.params.id);

if(!file){

return res.status(404).json({
message:"File not found"
});

}

fs.unlinkSync(file.path);

await File.findByIdAndDelete(req.params.id);

res.json({
message:"File deleted successfully"
});

}catch(err){

res.status(500).json({error:err.message});

}
});

module.exports = router;