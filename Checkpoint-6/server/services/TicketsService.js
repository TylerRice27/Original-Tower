import { dbContext } from "../db/DbContext";
import { BadRequest, Forbidden } from "../utils/Errors";





class TicketsService {

    async getMyTickets(accountId) {
        const tickets = await dbContext.Tickets.find({ accountId })

            // Make sure to put populate event for TowerEvents or you will have
            // problems with naming conventions
            .populate('event')
        return tickets
    }

    async getById(id) {
        const ticket = await dbContext.Tickets.findById(id)
        if (!ticket) {
            throw new BadRequest("Invalid Id")
        }
        return ticket
    }

    // come back to this method I retured an array but
    // it also contains tickets for other events and maybe
    // different object comparison
    async getEventTickets(towerEventId) {
        const tickets = await dbContext.Tickets.find({ towerEventId })
            .populate('account', 'name picture')

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

    // able to delete but need to figure out capacity problem
    async delete(id, userId) {
        const ticket = await this.getById(id)
        if (ticket.accountId.toString() != userId) {
            throw new Forbidden("Can not remove another users ticket")
        }
        // const towerEvent = await dbContext.TowerEvents.findById(id)
        // towerEvent.capacity += 1
        await ticket.remove()
    }


}


export const ticketsService = new TicketsService()