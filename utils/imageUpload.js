const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + extension);
  },
});
const upload = multer({ storage: storage, limits: { fileSize: 10000000 } });

module.exports.uploadImg = upload.single("image");
module.exports.uploadImgs = upload.array("images");
module.exports.deleteFile = (path) => fs.unlinkSync(path);
