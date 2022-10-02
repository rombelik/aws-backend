'use strict'

import AWS from 'aws-sdk';
import { headers } from './headers';

const Client = new AWS.DynamoDB.DocumentClient();

export const getProductsList = async (event) => {

  try {
    const products = await Client.scan({
      TableName: 'aws_products',
    }).promise()
  
    const stocks = await Client.scan({
      TableName: 'aws_stocks',
    }).promise()
  
    const getCount = (id) => {
      const result = stocks['Items'].filter((el) => el.product_id === id )
      if (result && result.length > 0) {
        return result[0]['count']
      } else {
        return 0
      }
    }
    const a = []
    products['Items'].map((product) => {
      a.push({
        id: product.id,
        title: product.title,
        description: product.description,
        count: getCount(product.id)
       })
    })
      return {
        statusCode: 200,
        body: JSON.stringify(
          a,
          null,
          2
        ),
      };
  } catch (err) {
    return {
      headers,
      statusCode: 500,
      body: JSON.stringify({ message: `${err}` })
    }; 
  }


};
