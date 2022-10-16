import * as AWS from 'aws-sdk';
import { S3Event } from 'aws-lambda';
import csv from 'csv-parser';
import { middyfy } from '@libs/lambda';
import { headers } from '../../headers';
import { SQSClient, SendMessageCommand } from '@aws-sdk/client-sqs';

import { REGION, UPLOADED, PARSED  } from '../../constants'

export const importFileParser = async (event: S3Event) => {

	try {
		for (const record of event.Records) {
	  
			const s3 = new AWS.S3({ region: REGION });

      const name = record.s3.bucket.name
      const key = record.s3.object.key
      console.log(`Working with backet ${name}, key: ${key}, s3 ${s3}`);
      console.log('process.env.SQS_QUEUE_URL', process.env.SQS_QUEUE_URL)
      console.log('test2', process.env.SQS_QUEUE_URL)
      const results = []
			const s3Object = await s3.getObject({
			  Bucket: name,
			  Key: key
			}).createReadStream()

      const transformedStream = await s3Object.pipe(csv());
      const sqs = new AWS.SQS();
      transformedStream.on('data', (parsedData) => {
        const sqsResult = sqs.sendMessage(
          {
            MessageBody: JSON.stringify(parsedData),
            QueueUrl: process.env.SQS_QUEUE_URL,
          },
          (err, data) => {
            if (err) {
              console.error('transformedStream error:', err);
              return;
            }
            console.log('transformedStream data:', data);
          }
        );
        console.log('sqsResult', sqsResult)
      })
      .on('end', async () => {
        console.log(results);
        console.log('results', results);
      });

      console.log('getObject result', s3Object)



      const copy_result = await s3
      .copyObject({
        Bucket: name,
        CopySource: `${name}/${key}`,
        Key: key.replace(UPLOADED, PARSED),
      }).promise();

      console.log('copy_result', copy_result)

      const delete_result = await s3
      .deleteObject({
        Bucket: name,
        Key: key
      }).promise();

      console.log('delete_result===>', delete_result)
  
	  }
    return {
      headers,
      statusCode: 200,
      body: JSON.stringify({ message: 'data was copied' })
    }
  } catch (err) {
      return {
        headers,
        statusCode: 500,
        body: JSON.stringify({ message: `${err}` })
      }
	  }
  };

export const main = middyfy(importFileParser);
