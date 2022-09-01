const userController = require("../controls/userControl");
const upload = require("../multer");
const route = require("express").Router();

route.post("/adduser", upload.single("image"), userController.createUser);
route.get("/alluser", userController.findAllUser);

route.get("/userevent/:id", userController.findOneUserEvent);
route.delete("/deleteuser/:id", userController.deletSpecificOneUser);
// route.post(
//   "/uploadimage",
//   upload.single("image"),
//   userController.uploadImageFile
// );

module.exports = route;
