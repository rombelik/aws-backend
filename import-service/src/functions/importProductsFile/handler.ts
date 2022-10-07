import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<string> = async (event) => {
  return formatJSONResponse({
    message: `Hi ${event.queryStringParameters.name}, welcome to the exciting Serverless world!`,
    event,
  });
};



export const main = middyfy(importProductsFile);
