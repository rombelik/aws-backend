import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

const Client = new AWS.DynamoDB.DocumentClient();

export const createProduct = async (event) => {
  const body = JSON.parse(event.body);
  console.log(body);
  const {title, price, description, count} = body;
  try {    


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
  
      await Client.put({
        TableName: 'aws_products',    
        Item: product,
      }).promise().then((resp) => console.log('resp post', resp));
  
      await Client.put({
        TableName: 'aws_stocks',    
        Item: stock,
      }).promise().then((resp) => console.log('resp post', resp));;
  
      return {
        statusCode: 201,
        body: JSON.stringify(product) + JSON.stringify(stock),
      };
    
    } else {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Product data is invalid" }),
      };
    } 
 
} catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `${error}` })
    }; 
  }
} 