import { AppState } from '../AppState'
import { api } from './AxiosService'




class TicketsService {


    async getTicketsByEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.tickets = res.data
    }

    async createTicket(ticketData) {
        const res = await api.post('/api/tickets', ticketData)
        AppState.tickets.push(res.data)
        AppState.eventTickets.push(res.data)
    }
}



export const ticketsService = new TicketsService()