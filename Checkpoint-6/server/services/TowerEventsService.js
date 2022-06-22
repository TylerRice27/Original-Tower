import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";


class TowerEventsService {

    async getAll(query = {}) {
        let towerEvents = await dbContext.TowerEvents.find(query).populate('creator', 'name picture')
        return towerEvents
    }

    async getById(id) {
        let towerEvent = await dbContext.TowerEvents.findById(id).populate('creator', 'name picture')
        return towerEvent
    }
    async create(body) {
        let towerEvent = await dbContext.TowerEvents.create(body)
        await towerEvent.populate('creator', 'name picture')
        return towerEvent
    }

    async update(id, update) {
        const original = await dbContext.TowerEvents.findById(id).populate('creator', 'name picture')
        if (original.creatorId.toString() != update.creatorId) {
            throw new BadRequest("You don't have permission to edit this event")
        }
        if (original.isCanceled == true) {
            throw new BadRequest("This event is already canceled ")
        }
        original.name = update.name ? update.name : original.name
        original.description = update.description ? update.description : original.description
        original.coverImg = update.coverImg ? update.coverImg : original.coverImg
        original.location = update.location ? update.location : original.location
        original.capacity = update.capacity ? update.capacity : original.capacity
        original.startDate = update.startDate ? update.startDate : original.startDate
        original.type = update.type ? update.type : original.type
        original.save()
        return update
    }
    async delete(id, userId) {
        const towerEvent = await dbContext.TowerEvents.findById(id)
        if (towerEvent.creatorId.toString() != userId) {
            throw new BadRequest("You don't have permission to delete this event")
        }
        // await dbContext.Tickets.deleteMany({ towerEventId: id })

        // await dbContext.Comments.deleteMany({ towerEventId: id })

        towerEvent.isCanceled = true
        await towerEvent.save()


        // return `deleted towerEvent ${towerEvent.name}, and all of its child data`
    }

}



export const towerEventsService = new TowerEventsService()