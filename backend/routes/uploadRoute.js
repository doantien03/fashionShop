const express = require("express");
const router = express.Router();

const multer = require("multer");
const cloudinary = require("../config/cloudinary");

const upload = multer({storage: multer.memoryStorage()});

router.post("/image",upload.single("image"),
async (req, res) => {
try {
  const file = req.file;
  if (!file) {
    return res.status(400).json({
      success: false,
      message: "Vui lòng chọn ảnh"
    });
  }
  const category = req.body.category || "other";
  const base64 = `data:${file.mimetype};base64,${
      file.buffer.toString("base64")
    }`;
  const result =await cloudinary.uploader.upload(base64,
      {
        folder:`productsFashionS/${category}`
      }
    );
  res.status(200).json({
    success: true,
    url: result.secure_url,
    publicId: result.public_id
  });

} catch(error){
  console.log("UPLOAD ERROR:");
  console.log(error);
  res.status(500).json({
    success:false,
    message:error.message
  });
 }
}
);

module.exports = router;
