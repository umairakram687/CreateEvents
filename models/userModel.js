module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("user", {
    title: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.STRING,
    },
    locationofEvent: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.STRING,
    },
    startdate: {
      type: DataTypes.DATEONLY,
    },
    starttime: {
      type: DataTypes.TIME,
    },
    enddate: {
      type: DataTypes.DATEONLY,
    },
    endtime: {
      type: DataTypes.TIME,
    },
    timezone: {
      type: DataTypes.STRING,
    },
    typeofticket: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    noofadmission: {
      type: DataTypes.INTEGER,
    },
    quantity: {
      type: DataTypes.INTEGER,
    },
    salestartdate: {
      type: DataTypes.DATEONLY,
    },
    salestarttime: {
      type: DataTypes.TIME,
    },
    saleenddate: {
      type: DataTypes.DATEONLY,
    },
    saleendtime: {
      type: DataTypes.TIME,
    },
  });
  return User;
};
