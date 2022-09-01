const dbConfig = require("../config/dbconfig");

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.max,
    min: dbConfig.min,
    acquire: dbConfig.acquire,
    idle: dbConfig.idle,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("sequelize is working");
  })
  .catch((err) => {
    console.log("Error in sequelize", err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./userModel")(sequelize, DataTypes);
db.eventtypes = require("./eventtypesModel")(sequelize, DataTypes);
// user to Eventtype one-to-one

db.user.hasOne(db.eventtypes, {
  foreignKey: "User_ID",
});
db.eventtypes.belongsTo(db.user);

//EventType to TypeCategories one-to-many
db.eventtypesCategories = require("./eventtypesCategoriesModel")(
  sequelize,
  DataTypes
);

db.user.hasMany(db.eventtypesCategories, {
  foreignKey: "User_ID",
});
db.eventtypesCategories.belongsTo(db.user);

db.uploadfile = require("./uploadFileModel")(sequelize, DataTypes);

db.user.hasMany(db.uploadfile, {
  foreignKey: "User_ID",
});
db.uploadfile.belongsTo(db.user);

db.sequelize.sync({ force: false }).then(() => {
  console.log("Sequelize Re-Sync Done!!!!!");
});

module.exports = db;
