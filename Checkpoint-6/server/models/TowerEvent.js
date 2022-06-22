import mongoose from "mongoose"

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

export const TowerEventSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    id: { type: String, required: true },
    creatorId: { type: ObjectId, required: true, ref: 'Account' },
    coverImg: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    startDate: { type: Date, required: true },
    isCanceled: { type: Boolean, default: false },
    type: { enum: ['concert', 'convention', 'sport', 'digital'] }

},
    { timestamps: true, toJSON: { virtuals: true } }
)

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    ref: 'Account',
    justOne: true
})