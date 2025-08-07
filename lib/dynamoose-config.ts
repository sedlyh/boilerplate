import dynamoose from 'dynamoose';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'; // ✅ Use this

const client = new DynamoDBClient({
    region: process.env.MY_AWS_REGION!,
    credentials: {
        accessKeyId: process.env.MY_AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY!,
    },
});

dynamoose.aws.ddb.set(client); // ✅ Correct input type

export default dynamoose;