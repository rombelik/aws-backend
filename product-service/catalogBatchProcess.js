'use strict'
import AWS from 'aws-sdk';
import { headers } from './headers';

export const catalogBatchProcess = async () => {
    try {
        await console.log('test')
    } 
    catch (err) {
        return {
            headers,
            statusCode: 500,
            body: JSON.stringify({ message: `${err}` })
        }; 
    }
}