import { getProductsList } from "./getProductsList";
import { products } from "./products"

import AWS from 'aws-sdk';

describe('getProductsList test', () => {
    test('get first id from array', async () => {
    const result = await getProductsList()
    expect(result).toBe("e7a91769-6512-4932-99bf-3e09704db8dc");
    });

    test('get code response', async () => {
        const result = await getProductsList()
        expect(JSON.parse(result.statusCode)).toBe(200);
    });

})