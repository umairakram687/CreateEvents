module.exports = (sequelize, DataTypes) => {
  const EventTypesCategories = sequelize.define("eventtypescategories", {
    categorytypeofevent: {
      type: DataTypes.STRING,
    },
    User_ID: {
      type: DataTypes.INTEGER,
    },
  });
  return EventTypesCategories;
};
