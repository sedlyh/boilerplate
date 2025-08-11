import {model, Schema} from "dynamoose";

const BoardSchema = new Schema({
    PK: { type: String, hashKey: true }, // PROJECT#project_456
    SK: { type: String, rangeKey: true }, // BOARD#board_789
    type: { type: String, default: 'Board' },
    name: String,
    boardType: String, // 'kanban' | 'scrum'
    statusColumns: {
        type: Array,
        schema: [String], // e.g., ['To Do', 'In Progress', 'Done']
    },
    createdAt: String,
})

export const BoardModel = model(process.env.NEXT_PUBLIC_DYNAMODB_TABLE!, BoardSchema)
