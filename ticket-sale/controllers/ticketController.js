exports.createTicket = async (req, res) => {
    try {
        const ticket = req.body;

        if (!ticket) {
            return res.status(400).json({message: 'Ticket data is required.'});
        }

        const ticketWithId = await ticketService.createTicket(ticket);

        if (!ticketWithId) {
            return res.status(400).json({message: 'Unable to create the ticket.'});
        }

        return res.status(201).json({
            message: 'Ticket successfully created',
            data: ticketWithId
        });
    } 
    catch (error) {
        return res.status(500).json({
            message: 'Error creating the ticket',
            error: error.message
        });
    }
}

exports.updateTicket = async (req, res) => {
    const ticketId = req.params.id;
    const ticket = req.body;

    if (id < 1 || id == null || isNaN(parseInt(ticketId))) {
        return res.status(400).json({message: 'Invalid id'});
    }

    try {
        const updatedTicket = await ticketService.updateTicket(ticketId, ticket);

        if (!updatedTicket) {
            return res.status(404).json({message: 'Ticket not found.'});
        }
        return res.status(200).json({
            message: 'Ticket successfully updated',
            data: updatedTicket
        });
    } 
    catch (error) {
        return res.status(500).json({
            message: 'Error updating ticket',
            error: error.message
        });
    }
}

exports.deleteTicket = async (req, res) => {
    try {
        const id = req.params.id;

        if (id < 1 || id == null || isNaN(parseInt(id))) {
            return res.status(404).json({message: 'Invalid id'});
        }

        const deleted = await ticketService.deleteTicket(id);

        if (!deleted) {
            return res.status(400).json({message: 'Unable to delete the ticket'});
        }

        return res.status(200).json({message: 'Ticket successfully deleted'});

    } 
    catch (error) {
        return res.status(500).json({
            message: 'Error deleting ticket',
            error: error.message
        });
    }
}

exports.buyTicket = async (req, res) => {
    try {
        const { ticketId, quantity } = req.body;

        if (!ticketId || isNaN(ticketId) || !quantity || quantity < 1) {
            return res.status(400).json({ message: 'Invalid ticket ID or quantity' });
        }

        const ticket = await ticketService.buyTicket(userId, ticketId, quantity);

        return res.status(200).json({
            message: 'Ticket purchased successfully',
            data: ticket
        });
    } 
    catch (error) {
        return res.status(500).json({
            message: 'Error purchasing ticket',
            error: error.message
        });
    }
};

exports.getUserTickets = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId || isNaN(userId)) {
            return res.status(400).json({message: 'Invalid user ID'});
        }

        const tickets = await ticketService.getUserTickets(userId);

        return res.status(200).json({
            message: "tickets loaded successfully",
            error: error.message
        });
    } 
    catch (error) {
        return res.status(500).json({
            message: 'Error loading tickets',
            error: error.message
        });
    }
};
