const { sequelize, DataTypes } = require("./index");
const User = require("./User");

const Address = sequelize.define(
  "Address",
  {
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

User.hasMany(Address, { foreignKey: "userId" });
Address.belongsTo(User, { foreignKey: "userId" });

module.exports = Address;
