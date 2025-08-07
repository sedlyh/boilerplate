import {model, Schema} from 'dynamoose'

const OrgSchema = new Schema({
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
        default: 'Organization',
    },
    name: String,
    createdAt: String,
})

export const Org = model(process.env.DYNAMODB_TABLE!, OrgSchema)
