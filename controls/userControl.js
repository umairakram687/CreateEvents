const db = require("../models");
const User = db.user;
const eventType = db.eventtypes;
const eventtypesCategories = db.eventtypesCategories;

// createUser

const createUser = async (req, res) => {
  const {
    title,
    description,
    Typeofevent,
    categorytypeofevent,
    locationofEvent,
    tags,
    address,
    startdate,
    starttime,
    enddate,
    endtime,
    timezone,
    typeofticket,
    price,
    noofadmission,
    quantity,
    salestartdate,
    salestarttime,
    saleenddate,
    saleendtime,
  } = req.body;

  if (
    title &&
    locationofEvent &&
    tags &&
    startdate &&
    starttime &&
    enddate &&
    endtime &&
    timezone &&
    typeofticket &&
    price &&
    noofadmission &&
    quantity &&
    salestartdate &&
    salestarttime &&
    saleenddate &&
    saleendtime
  )
    try {
      const userinfo = new User({
        title: title,
        description: description,
        locationofEvent: locationofEvent,
        tags: tags,
        address: address,
        startdate: startdate,
        starttime: starttime,
        enddate: enddate,
        endtime: endtime,
        timezone: timezone,
        typeofticket: typeofticket,
        price: price,
        noofadmission: noofadmission,
        quantity: quantity,
        salestartdate: salestartdate,
        salestarttime: salestarttime,
        saleenddate: saleenddate,
        saleendtime: saleendtime,
      });
      const userdata = await userinfo.save();
      res
        .status(200)
        .send({ Status: "Success", Massege: "User created", User: userdata });
      if (userdata && userdata.id) {
        console.log("a----------->", userdata.id);
        await eventType.create({
          Typeofevent: Typeofevent,
          User_ID: userdata.id,
        });
        await eventtypesCategories.create({
          categorytypeofevent: categorytypeofevent,
          User_ID: userdata.id,
        });
        console.log("usercategory------->", userdata.id);
      } else {
        res.status(200).send({
          Status: "Failed",
          Massege: "Please fill all require data",
          User_ID: userdata.id,
        });
      }
    } catch (error) {
      res.send({ Status: "Failed", Massege: "Uneble to create event" });
    }
};

// findOneUserEvent

const findOneUserEvent = async (req, res) => {
  let id = req.params.id;
  const user = await User.findOne({
    attributes: [
      "id",
      "title",
      "description",
      "locationofEvent",
      "tags",
      "address",
      "startdate",
      "starttime",
      "enddate",
      "endtime",
      "timezone",
      "typeofticket",
      "price",
      "noofadmission",
      "quantity",
      "salestartdate",
      "salestarttime",
      "saleenddate",
      "saleendtime",
    ],
    include: [
      {
        model: eventType,
        attributes: ["Typeofevent"],
      },
      {
        model: eventtypesCategories,
        attributes: ["categorytypeofevent"],
      },
    ],
    where: { id: id },
  });
  res.send({
    Status: "Success",
    Massege: "Your required user data",
    user: user,
  });
};

// const upload = require("multer");
// const cloudinary = require("../cloudinary");
// const fs = require("fs");

// server.use("/upload-image", upload.array("image"), async (req, res) => {
//   const uploader = async (path) => await cloudinary.uploads(path, "Images");
//   if (req.method === "POST") {
//     const urls = [];
//     const files = req.files;

//     for (const file of files) {
//       const { path } = file;
//       const newPath = await uploader(path);
//       urls.push(newPath);
//       fs.unlinkSync(path);
//     }
//     res.send({
//       Status: "Success",
//       Massege: "File uploaded successfully",
//       data: urls,
//     });
//   } else {
//     res.send({ Status: "failed", Massege: "File not upload successfully" });
//   }
// });

module.exports = {
  createUser,
  findOneUserEvent,
};
