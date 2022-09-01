const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "umairbracesol",
  api_key: "654428936167712",
  api_secret: "rsqe5XddRq19gPWv4qabMlzncvg",
});

module.exports = cloudinary;
