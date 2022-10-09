import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const Client = new AWS.DynamoDB.DocumentClient();
import { products } from "./products"
import { headers } from './headers';

export const seedEntries = async (event) => {
const result = []
  try {    
        for (const element of products) {
            const {title, price, description, count} = element;
            if (title) {
                const product = {
                    id: uuidv4(),
                    title,
                    price,
                    description
                };  
                
                const stock = {    
                    count,
                    product_id: product.id,
                }  
            
                const product_result = await Client.put({
                    TableName: 'aws_products',    
                    Item: product,
                })
                .promise()
                .then((resp) => {
                    console.log('resp post', resp)
                    result.push(resp)
                });
            
                const stock_result = await Client.put({
                    TableName: 'aws_stocks',    
                    Item: stock,
                })
                .promise()
                .then((resp) => {
                    console.log('resp post', resp)
                    result.push(resp)
                });
            }
        }
  
      return {
        headers,
        statusCode: 201,
        body: JSON.stringify({message: result})
      };

    } catch (error) {
        return {
            headers,
            statusCode: 500,
            body: JSON.stringify({ message: `${error}` })
        }; 
    }
}