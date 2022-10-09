import { getProductsById } from "./getProductsById";
import { products } from "./products"

describe('getProductsById', () => {
    test('get first id from array', async () => {
        const event = {
            pathParameters: {
              id: products[0]['id']
            }
          }
        const result = await getProductsById(event)
        expect(JSON.parse(result.body)[0]['id']).toBe(products[0]['id']);
    });

    test('get 404 code if wrong id response', async () => {
        const event = {
            pathParameters: {
              id: 'anywrongid'
            }
          }
        const result = await getProductsById(event)
        expect(JSON.parse(result.statusCode)).toBe(404);
    });

    test('get a specific message if wrong id response', async () => {
        const event = {
            pathParameters: {
              id: 'anywrongid'
            }
          }
        const result = await getProductsById(event)
        expect(JSON.parse(result.body)).toBe('Product not found');
    });

})