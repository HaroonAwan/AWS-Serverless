const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-1'});

const dynamodb = new AWS.DynamoDB();
const dynamoDoc = new AWS.DynamoDB.DocumentClient();

/// Table Operations Below

// dynamodb.listTables({}, (err, data) => {
//     if (err) console.log(err, err.stack);
//     else console.log(data);
// });

// dynamodb.describeTable({
//     TableName: 'notes'
// }, (err, data) => {
//     if (err) console.log(err, err.stack);
//     else console.log(JSON.stringify(data, null, 2));
// });

/// Item Operations Below

// dynamoDoc.put({
//     TableName: "notes",
//     Item: {
//         user_id: "bb",
//         timestamp: 2,
//         title: "My second note",
//         content: "This is my second note"
//     }
// }, (err, data) => {
//     if (err) console.log(err, err.stack);
//     else console.log(data);
// })

// dynamoDoc.update({
//     TableName: "notes",
//     Key: {
//         user_id: "bb",
//         timestamp: 2
//     },
//     UpdateExpression: 'set #t = :t',
//     ExpressionAttributeNames: {
//         '#t': 'title'
//     },
//     ExpressionAttributeValues: {
//         ':t': 'My second note UPDATED'
//     }
// }, (err, data) => {
//     if (err) console.log(err, err.stack);
//     else console.log(data);
// })

// dynamoDoc.delete({
//     TableName: "notes",
//     Key: {
//         user_id: "bb",
//         timestamp: 2
//     },
// }, (err, data) => {
//     if (err) console.log(err, err.stack);
//     else console.log(data);
// })
