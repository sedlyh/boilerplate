import {model, Schema} from "dynamoose";

const CommentSchema = new Schema({
    PK: { type: String, hashKey: true }, // ISSUE#issue_101
    SK: { type: String, rangeKey: true }, // COMMENT#comment_123
    type: { type: String, default: 'Comment' },
    authorId: String,
    body: String,
    timestamp: String,
})

export const CommentModel = model(process.env.DYNAMODB_TABLE!, CommentSchema)
