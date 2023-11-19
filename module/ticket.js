module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Ticket",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      price: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "PRIX est obligatoire" },
        },
      },
      numticket: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "numticket est obligatoire" },
        },
      },
      name: {
        type: DataTypes.STRING,
      },
      
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
