import { AppState } from "../AppState"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"



class TowerEventsService {

    async getEvents(query = '') {
        const res = await api.get('api/events' + query)
        logger.log('get my events', res.data)
        AppState.events = res.data
    }

}


export const towerEventsService = new TowerEventsService()