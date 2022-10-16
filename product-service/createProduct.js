import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { headers } from './headers'
const Client = new AWS.DynamoDB.DocumentClient();

export const createProduct = async (event) => {
  const body = JSON.parse(event.body);
  console.log('createProduct body', body);
  const {title, price, description, count} = body;
  try {    

    if (title 
      && typeof title === 'string' 
      && typeof price === 'number' 
      && typeof description === 'string'
      && typeof count === 'number'
    ) {
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
  
      return {
        headers,
        statusCode: 201,
        body: JSON.stringify({ product: product, stock: stock }),
      };
    
    } else {
      console.log('product data is invalid')
      return {
        headers,
        statusCode: 400,
        body: JSON.stringify({ message: "Product data is invalid" }),
      };
    } 
 
} catch (error) {
    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({ message: `${error}` })
    }; 
  }
} 