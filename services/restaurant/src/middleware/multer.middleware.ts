import multer from "multer";

const storage = multer.memoryStorage();

const fileUpload = multer({ storage }).single("image");

export default fileUpload;
