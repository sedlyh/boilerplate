import {model, Schema} from 'dynamoose'

const MembershipSchema = new Schema({
    PK: {
        type: String,
        hashKey: true,
    },
    SK: {
        type: String,
        rangeKey: true,
    },
    type: String,  // 'UserOrg' or 'UserTeam'
    role: String,  // 'OrgAdmin', 'Member', 'Lead', etc.
    permissions: {
        type: Array,
        schema: [String],
        required: false,
    },
})

export const Membership = model(process.env.DYNAMODB_TABLE!, MembershipSchema)
