import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { headers } from '../../headers';

import { REGION, BUCKET_NAME } from '../../constants'

export const importProductsFile = async (event) => {

	try {
			const fileName = event.queryStringParameters.name
			console.log(fileName)

			const isFileNameVaild = (name) => {
				return (typeof name === 'string' && name !== '' && name.split('.').pop() === 'csv')
			}
	
			if (isFileNameVaild(fileName)) {
				const s3Client = new S3Client({ region: REGION });
				const params = { 
					Bucket: BUCKET_NAME, 
					Key: `uploaded/${fileName}`, 
					ContentType: 'text/csv'
        		}
        const command = new PutObjectCommand(params);
				const url = await getSignedUrl(s3Client, command, { expiresIn: 3600, });
				return { headers, statusCode: 200, body: JSON.stringify(url) }
			} else {
				return formatJSONResponse({ statusCode: 400, body: 'File name is not correct' })
			}
			
	  } catch (err) {
		return {
			headers,
			statusCode: 500,
			body: JSON.stringify({ message: `${err.message}` })
		}
	  }
};



export const main = middyfy(importProductsFile);
