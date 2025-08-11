import {model, Schema} from "dynamoose";

const IssueSchema = new Schema({
    PK: { type: String, hashKey: true }, // BOARD#board_789
    SK: { type: String, rangeKey: true }, // ISSUE#issue_101
    type: { type: String, default: 'Issue' }, // or 'Epic', 'Bug', 'Task'
    title: String,
    description: String,
    status: String,
    assignee: String, // user_id
    priority: String,
    parentIssueId: String, // for subtasks
    createdAt: String,
})

export const IssueModel = model(process.env.NEXT_PUBLIC_DYNAMODB_TABLE!, IssueSchema)
