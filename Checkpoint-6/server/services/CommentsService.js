import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"




class CommentsService {

    async getEventsComments(eventId) {

        const comments = await dbContext.Comments.find({ eventId })
            .populate('creator', 'name picture')

        return comments

        // const towerEvent = await towerEventsService.getById(eventId)
        // const comments = await dbContext.Comments.find({ eventId })
        // return { towerEvent, comments }
        // if (towerEvent.creatorId.toString() == userId) {
        // }
    }

    async create(body) {
        let comment = await dbContext.Comments.create(body)
        await comment.populate('creator', 'name picture')
        return comment
    }

    async delete(id, userId) {
        const comment = await dbContext.Comments.findById(id)
        if (comment.creatorId.toString() != userId) {
            throw new BadRequest("You don't have permission to delete that comment")
        }
        comment.remove()
        return comment
    }


}


export const commentsService = new CommentsService()