const express = require('express');
const { Tickets } = require('../models');
const auth = require('../controllers/auth');
const { where } = require('sequelize');
const router = express.Router();

router.post("/", auth.validAcess, async (req, res) => {

    if (req.user.role != 'admin') {
        return res.status(403).json({message: "Acess denied"});
    }
    const {name, price, quantity} = req.body;

    const ticket = await Tickets.create({ name, price, quantity });

    res.status(201).json(ticket);
});

router.get("/", auth.validAcess, async (req, res) => {
    const tickets = await Tickets.findAll({where: {userId: req.user.id}});
    //res.json(tickets);
    res.render("tickets", { tickets });
});

router.put("/:id", auth.validAcess, async (req, res) => {

    if (req.user.role != 'admin') {
        return res.status(403).json({message: "Acess denied"});
    }

    const {name, price, quantity} = req.body;

    const ticket = await Tickets.findByPk(req.params.id);

    if (!ticket) {
        return res.status(404).json({message: "Ticket not found"});
    }

    await ticket.update({name, price, quantity});

    res.json(ticket);
});

router.delete("/:id", auth.validAcess, async (req, res) => {

    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied" });
    }

    const ticket = await Tickets.findByPk(req.params.id);

    if (!ticket) {
        return res.status(404).json({message: "Ticket not found"});
    }

    await ticket.destroy();

    res.json({message: 'Ticket deleted'});
});

router.post("/buy", auth.validAcess, async (req, res) => {
    try {
        const {ticketId, quantity} = req.body;
        const userId = req.user.id;

        if (!ticketId || !quantity || parseInt(quantity) <= 0) {
            return res.status(400).json({ error: "Invalid ticketId or quantity" });
        }

        const ticket = await ticketServices.buyTicket(userId, ticketId, quantity);

        res.json({ message: "Ticket purchased successfully", ticket });
    } 
    catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;