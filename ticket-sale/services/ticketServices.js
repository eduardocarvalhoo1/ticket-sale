const { where } = require('sequelize');
const {Tickets, UserTickets} = require('../models');

exports.createTicket = async (tickets) =>{
    try {
        const newTicket = await Tickets.create(tickets);
        return newTicket;
    } 
    catch (error) {
        throw new Error('Error creating the ticket: ' + error.message);
    }
};

exports.deleteTicket = async (id) =>{
    try {
        const deletedCout = await Tickets.destroy({where: {id}});

        if (deletedCout == 0) {
            throw new Error("Ticket not found");
        }
        return true;
    } 
    catch (error) {
        throw new Error("Error deleting the ticket: " + error.message);
    }
};

exports.updateTicket = async (id, tickets) => {
    try {
        const [rowsUpdated] = await Tickets.update(tickets, {where:{id}});

        if (rowsUpdated == 0) {
            throw new Error("Ticket not found");
        }
        const updatedTicket = await Tickets.findOne({where: {id}});
        return updatedTicket;
    } 
    catch (error) {
        throw new Error("Error updating the ticket" + error.message);
        
    }
}

exports.buyTicket = async (userId, ticketId, quantity) => {
    try {
        const ticket = await Tickets.findOne({ where: { id: ticketId } });

        if (!ticket) {
            throw new Error("Ticket not found");
        }

        if (ticket.quantity < quantity) {
            throw new Error("Not enough tickets in stock");
        }

        ticket.quantity -= quantity;
        await ticket.save();

        // Salva a compra na tabela
        await UserTickets.create({
            userId,
            ticketId,
            quantity
        });

        return ticket;
    } 
    catch (error) {
        throw new Error("Error buying ticket: " + error.message);
    }
};

exports.getUserTickets = async (userId) => {
    try {
        const tickets = await UserTickets.findAll({
            where:{userId},
            include: [{model: Tickets, as: 'ticket'}]
        });
        return tickets;
    } 
    catch (error) {
        throw new Error("Error loading tickets" + error.message);
    }
};
