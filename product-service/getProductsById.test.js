import { getProductsById } from "./getProductsById";

describe('getProductsById', () => {
    test('get first id from array', async () => {
        const event = {
            pathParameters: {
              id: "e7a91769-6512-4932-99bf-3e09704db8dc"
            }
          }
        const result = await getProductsById(event)
        expect(JSON.parse(result.body)[0]['id']).toBe("e7a91769-6512-4932-99bf-3e09704db8dc");
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