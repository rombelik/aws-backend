import { getProductsList } from "./getProductsList";
import { products } from "./products"

describe('getProductsList test', () => {
    test('get first id from array', async () => {
    const result = await getProductsList()
    expect(JSON.parse(result.body)[0]['id']).toBe(products[0]['id']);
    });

    test('get code response', async () => {
        const result = await getProductsList()
        expect(JSON.parse(result.statusCode)).toBe(200);
    });

})