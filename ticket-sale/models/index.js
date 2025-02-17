const {Sequelize, DataTypes} = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: config.dialect,
    port: config.port
});

const Tickets = require('./Tickets')(sequelize, DataTypes);
const UserTickets = require('./UserTickets')(sequelize, DataTypes);
const Users = require('./Users')(sequelize, DataTypes);

Users.hasMany(UserTickets, { foreignKey: "userId" });
UserTickets.belongsTo(Users, { foreignKey: "userId" });

module.exports = {
    sequelize,
    Tickets,
    Users,
    UserTickets
}