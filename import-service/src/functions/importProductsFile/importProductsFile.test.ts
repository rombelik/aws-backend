import * as SDK from 'aws-sdk';
import * as AWS from 'aws-sdk-mock';
import { importProductsFile } from '@functions/importProductsFile/handler';

const file = 'somenamefile.csv';
const event = {
  queryStringParameters: {
    name: file,
  },
};

describe('import products file lambda handler tests', () => {
  afterEach(() => {
    AWS.restore();
  });
  it('signed url should content PutObject', async () => {
    AWS.setSDKInstance(SDK);
    AWS.mock('S3', 'getSignedUrl', '');
    const res = await importProductsFile(event);
    expect(JSON.parse(res.body).split('=').pop()).toEqual("PutObject");
    expect(res.statusCode).toBe(200);
  });

  it('signed url should content file name', async () => {
    AWS.setSDKInstance(SDK);
    AWS.mock('S3', 'getSignedUrl', '');
    const res = await importProductsFile(event);
    expect(JSON.parse(res.body).split('?')[0].split('/')[4]).toEqual(file);
    expect(res.statusCode).toBe(200);
  });

  it('signed url should response correct status code', async () => {
    AWS.setSDKInstance(SDK);
    AWS.mock('S3', 'getSignedUrl', '');
    const res = await importProductsFile(event);
    expect(res.statusCode).toBe(200);
  });

  it('should return 500 code response if a wrong args passed', async () => {
    AWS.setSDKInstance(SDK);
    AWS.mock('S3', 'getSignedUrl', '');
    const res = await importProductsFile('wrong_argument');
    expect(res.statusCode).toBe(500);
  });

});