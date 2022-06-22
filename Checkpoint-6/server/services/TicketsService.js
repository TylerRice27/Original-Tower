import { dbContext } from "../db/DbContext";





class TicketsService {
    async getEventTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId })
            .populate('towerEvent')
            .populate('tier')
        return tickets
    }



    async create(ticketData) {




        const ticket = await dbContext.Tickets.create(ticketData)

        await ticket.populate('event')
        await ticket.populate('account')
        const towerEvent = await dbContext.TowerEvents.findById(ticketData.eventId)
        towerEvent.capacity -= 1
        await towerEvent.save()
        return ticket
    }



}


export const ticketsService = new TicketsService()