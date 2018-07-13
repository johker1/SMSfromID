let AWS = require('aws-sdk');
const ddb = new AWS.DynamoDB.DocumentClient();
const sns = new AWS.SNS();
exports.handler = function (event, context, callback) {

let childrenid = Number(event['childrenid']);


console.log(childrenid);

	ddb.get({
		TableName: 'children',
		Key: { 'id': childrenid }
	}, function (err, data) {
		if (err) {
			console.log(err)
		} else {
			let receiver = data.Item['phone'];
			console.log(receiver)
			let sender = 'AWS Lost Children';
			let message = 'Your children is now with me'
		}
	});

	let isPromotional = true;

	console.log("Sending message", message, "to receiver", receiver);

	sns.publish({
		Message: message,
		MessageAttributes: {
			'AWS.SNS.SMS.SMSType': {
				DataType: 'String',
				StringValue: 'Promotional'
			},
			'AWS.SNS.SMS.SenderID': {
				DataType: 'String',
				StringValue: sender
			},
		},
		PhoneNumber: receiver
	}).promise()
		.then(data => {
			console.log("Sent message to", receiver);
			callback(null, data);
		})
		.catch(err => {
			console.log("Sending failed", err);
			callback(err);
		});
}