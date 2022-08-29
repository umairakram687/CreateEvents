const cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: "umairbracesol",
  api_key: "654428936167712",
  api_secret: "rsqe5XddRq19gPWv4qabMlzncvg",
});

exports.upload = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader().upload(
      file,
      (result) => {
        resolve({
          url: result.url,
          id: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};
