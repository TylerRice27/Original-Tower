import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService";
import { towerEventsService } from "../services/TowerEventsService";
import BaseController from "../utils/BaseController";



export class TowerEventsController extends BaseController {

    constructor() {
        super('api/events')
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            // comeback later to get tickets inside an event
            .get('/:id/tickets', this.getTickets)
            .use(Auth0Provider.getAuthorizedUserInfo)
            // come back later to add more after test
            .post('', this.create)
            .put('/:id', this.update)
            .delete('/:id', this.delete)
    }

    async getAll(req, res, next) {
        try {
            const towerEvents = await towerEventsService.getAll(req.query)
            return res.send(towerEvents)
        } catch (error) {
            next(error)
        }
    }

    async getById(req, res, next) {
        try {
            const towerEvent = await towerEventsService.getById(req.params.id)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async getTickets(req, res, next) {
        try {
            const tickets = await ticketsService.getEventTickets(req.params.id)
            return res.send(tickets)
        } catch (error) {
            next(error)
        }
    }

    async create(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.create(req.body)
            return res.send(towerEvent)
        } catch (error) {
            next(error)
        }
    }

    async update(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const towerEvent = await towerEventsService.update(req.params.id, req.body)
            return res.send(towerEvent)
        } catch (error) {
            next(error)

        }
    }

    async delete(req, res, next) {
        try {
            const message = await towerEventsService.delete(req.params.id, req.userInfo.id)
            return res.send(message)
        } catch (error) {
            next(error)

        }
    }




}