module.exports = (sequelize, DataTypes) => {
  const EventTypes = sequelize.define("eventtypes", {
    Typeofevent: {
      type: DataTypes.STRING,
    },
    User_ID: {
      type: DataTypes.INTEGER,
    },
  });
  return EventTypes;
};
