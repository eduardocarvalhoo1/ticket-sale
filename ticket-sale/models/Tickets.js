

module.exports = (sequelize, DataTypes) => {
    const Tickets = sequelize.define('tickets', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 10
        }
    });
    return Tickets;
};