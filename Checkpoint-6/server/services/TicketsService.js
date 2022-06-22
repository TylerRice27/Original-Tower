import { dbContext } from "../db/DbContext";
import { TowerEventSchema } from "../models/TowerEvent";



class TicketsService {



    async create(ticketData) {




        const ticket = await dbContext.Tickets.create(ticketData)
        await ticket.populate('towerEvent')
        await ticket.populate('account')
        TowerEventSchema.
        return ticket
    }



}


export const ticketsService = new TicketsService()