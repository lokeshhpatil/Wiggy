import express from "express"
import cloudinary from "cloudinary"


const router = express.Router();

router.post("/upload", async (req, res) => {
  try {
    const { buffer } = req.body;
    if (!buffer) {
      return res.status(400).json({ message: "Buffer is required" });
    }

    const cloud = await cloudinary.v2.uploader.upload(buffer, {
      resource_type: "image",
      folder: "wiggy",
    });

    return res.status(200).json({ url: cloud.secure_url });
  } catch (error) {
    console.error("Error while uploading media on cloudinary", error);
    return res.status(502).json({ message: "Image upload failed" });
  }
})

export default router;