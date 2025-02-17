const { DataTypes } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    const UserTickets = sequelize.define('user_tickets', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        ticketId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        timestamps: false
    });

    return UserTickets;
};