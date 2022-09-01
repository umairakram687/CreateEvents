module.exports = (sequelize, DataTypes) => {
  const UploafFile = sequelize.define("uploadfile", {
    image: {
      type: DataTypes.STRING,
    },
    User_ID: {
      type: DataTypes.INTEGER,
    },
  });
  return UploafFile;
};
