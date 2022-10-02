import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import { products } from "./products"

const Client = new AWS.DynamoDB.DocumentClient();

export const createDBEntries = async (event) => {
    try {
        await products.map(async (item) => {
            const {title, description, price, count} = item

            const product = {
                id: uuidv4(),
                title: title || 'title',
                description: description || 'description',
                price: price || 0
            }
        
            const stock = {
                product_id: product.id,
                count: count || 0
            }

            console.log('product', product)
            console.log('stock', stock)

                
            try {
                const products_result = await Client.put({
                    TableName: 'aws_products',    
                    Item: product,
                  }).promise().then((resp) => console.log(resp)).catch(dbError => {
                    console.log(dbError);
                    throw dbError;
                  })
                console.log('products_result', products_result)  
          
                const stocks_result = await Client.put({
                    TableName: 'aws_stocks',    
                    Item: stock,
                  }).promise().then((resp) => console.log(resp)).catch(dbError => {
                    console.log('dbError', dbError);
                    throw dbError;
                  })
                console.log('stocks_result', stocks_result) 

            } catch (e) {
                console.log('e----->', e)
            }
        
        })
        
    return {
        statusCode: 201,
        body: JSON.stringify("DB entries are upload successfuly"),
        };
    
    } catch (e) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: `${e}` })
          }; 
    }

};
