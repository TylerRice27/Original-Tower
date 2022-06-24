import { AppState } from '../AppState'
import { api } from './AxiosService'




class TicketsService {


    async getTicketsByEvent(eventId) {
        const res = await api.get(`api/events/${eventId}/tickets`)
        AppState.tickets = res.data
    }
}



export const ticketsService = new TicketsService()