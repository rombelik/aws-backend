'use strict'
import AWS from 'aws-sdk';
import util from "util";
import { headers } from './headers';
import { v4 as uuidv4 } from 'uuid';
const Client = new AWS.DynamoDB.DocumentClient();

export const catalogBatchProcess = async (event) => {
    try {
        const sns = new AWS.SNS();
        console.log('event.Records ====>', event.Records)
        for (let record of event.Records) {
          try {
            console.log('record ====>', record)
            const parsedProduct = JSON.parse(record.body);
            const title = parsedProduct['Title']
            const price = parsedProduct['Price']
            const description = parsedProduct['Description']
            const count = parsedProduct['Count']
            const product = {
                id: uuidv4(),
                title,
                price,
                description
            };  
            console.log('id---->', product['id'])
            
            const stock = {    
                count,
                product_id: product.id,
            }  

            await Client.transactWrite({
                TransactItems: [
                {
                    Put: {
                    TableName: 'aws_products',
                    Item: product
                    }
                },
                {
                    Put: {
                    TableName: 'aws_stocks',
                    Item: stock
                    }
                }
                ]
            }).promise();  

            console.log('product---->', product)
            
            const message = await sns
              .publish({
                Message: `Product was created: ${JSON.stringify(product)}`,
                TopicArn: process.env.SNS_TOPIC_NAME,
                MessageAttributes: {
                  event: {
                    DataType: "String",
                    StringValue: "product_created",
                  },
                  price: {
                    DataType: "Number",
                    StringValue: String(product.price),
                  },
                },
              })
              .promise();
            console.log('result sns message ====>', message)
          } catch (err) {
            console.error(`Error when try to send SNS message: ${err.message}`);
          }
        }
        
    } 
    catch (err) {
        return {
            headers,
            statusCode: 500,
            body: JSON.stringify({ message: `${err}` })
        }; 
    }
}