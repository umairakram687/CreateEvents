const db = require("../models");
const cloudinary = require("../cloudinary");
const User = db.user;
const eventType = db.eventtypes;
const eventtypesCategories = db.eventtypesCategories;
const fileUpload = db.uploadfile;

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
    image,
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
        try {
          const result = await cloudinary.uploader.upload(req.file.path);
          // console.log("result----->", result);
          await fileUpload.create({
            image: result.secure_url,
            User_ID: userdata.id,
          });
        } catch (error) {
          res.send({ Massege: "Error Image", error: error });
        }
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
      {
        model: fileUpload,
        attributes: ["image"],
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

//findAllUser

const findAllUser = async (req, res) => {
  const users = await User.findAll({
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
      {
        model: fileUpload,
        attributes: ["image"],
      },
    ],
  });
  res.send({ Massege: "all users", users: users });
};

//deletSpecificOneUser

const deletSpecificOneUser = async (req, res) => {
  console.log("req.id--------->", req.id);
  let id = req.params.id;
  console.log("delete.....>>>> id", id);
  const deletuser = await User.findOne({
    // include: [
    //   {
    //     model: eventType,
    //     // attributes: ["Typeofevent"],
    //   },
    //   {
    //     model: eventtypesCategories,
    //     // attributes: ["categorytypeofevent"],
    //   },
    //   {
    //     model: fileUpload,
    //     // attributes: ["image"],
    //   },
    // ],
    where: { id: id },
  });
  if ((id = deletuser?.id)) {
    await deletuser.destroy({ where: { id: id } });
    res.send({ Massege: "deleted", user: deletuser });
  } else {
    res.send({ Massege: "id not found" });
  }
};

// uploadImageFile
// const uploadImageFile = async (req, res) => {
//   console.log("req.file----- >", req.file);
//   try {
//     const result = await cloudinary.uploader.upload(req.file.path);
//     console.log("result------->", result);

//     res.send({ Massege: "Success", result: result });
//   } catch (error) {
//     res.send({ Massege: "Error Image", error: error });
//   }
// };

module.exports = {
  createUser,
  findOneUserEvent,
  deletSpecificOneUser,
  findAllUser,

  // uploadImageFile,
};
