module.exports = (sequelize, DataTypes) => {
    const Student = sequelize.define('Student', {
      username: { type: DataTypes.STRING, unique: true, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      firstname: { type: DataTypes.STRING, allowNull: false },
      lastname: { type: DataTypes.STRING, allowNull: false },
      telephone: DataTypes.STRING,
      address: DataTypes.TEXT,
    });
    return Student;
  };
  