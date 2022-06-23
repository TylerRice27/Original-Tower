import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class TowerEventsService {

    async createTowerEvent(body) {
        const res = await api.post('api/events', body)
        logger.log('created Event', res.data)
        AppState.events.push(res.data)
    }

    async getEvents(query = '') {
        const res = await api.get('api/events' + query)
        logger.log('get my events', res.data)
        AppState.events = res.data
    }

}


export const towerEventsService = new TowerEventsService()