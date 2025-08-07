import {model, Schema} from 'dynamoose'

const TeamsSchema = new Schema({
    PK: {
        type: String,
        hashKey: true,
    },
    SK: {
        type: String,
        rangeKey: true,
    },
    type: {
        type: String,
        default: 'Team',
    },
    name: String,
    createdAt: String,
})

export const Team = model(process.env.DYNAMODB_TABLE!, TeamsSchema)
