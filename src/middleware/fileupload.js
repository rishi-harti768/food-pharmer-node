import multer from "multer";
import path from "path";

const disk = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/reportImgs");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: disk, dest: "public/reportImgs" });

export default upload;
