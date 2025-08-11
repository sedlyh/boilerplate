import { Schema, model } from "dynamoose";

const usersSchema = new Schema({
    PK: {
        type: String,
        hashKey: true,
    },
    SK: {
        type: String,
        rangeKey: true,
        index: {
            name: "SK_GSI", // This creates the LSI on SK
            type: "global",
        },
    },
    type: {
        type: String,
        default: 'User',
    },
    email: String,
    name: String,
    joinedAt: String,
});

export const User = model(process.env.NEXT_PUBLIC_DYNAMODB_TABLE!, usersSchema);