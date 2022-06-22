import mongoose from 'mongoose'
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const TicketSchema = new Schema({
    accountId: { type: ObjectId, ref: 'Account', required: true },
    towerEventId: { type: ObjectId, ref: 'TowerEvent', required: true },
    id: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } }
)

TicketSchema.virtual('account', {
    localField: 'accountId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TicketSchema.virtual('towerEvent', {
    localField: 'towerEventId',
    ref: 'TowerEvent',
    foreignField: '_id',
    justOne: true
})