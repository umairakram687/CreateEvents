const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload/");
  },
  filename: function (req, res, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb({ Status: "failed", Massege: "UnSportted file" });
  }
};

const upload = multer({
  storage: storage,
  limits: {},
  fileFilter: fileFilter,
});

module.exports = upload;
