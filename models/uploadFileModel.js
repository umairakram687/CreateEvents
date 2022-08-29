module.exports = (sequelize, DataTypes) => {
  const UploafFile = sequelize.define("uploadfile", {
    image: {
      type: DataTypes.STRING,
    },
  });
  return UploafFile;
};
