import {model, Schema} from "dynamoose";

const ProjectSchema = new Schema({
    PK: { type: String, hashKey: true }, // TEAM#team_123
    SK: { type: String, rangeKey: true }, // PROJECT#project_456
    type: { type: String, default: 'Project' },
    name: String,
    completed: Boolean,
    description: String,
    createdAt: String,
    visibility: { type: String, default: 'team' }, // or 'org', 'private'
})

export const Project = model(process.env.DYNAMODB_TABLE!, ProjectSchema)