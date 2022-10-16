import AWSMock from 'aws-sdk-mock';
import AWS from 'aws-sdk';
import { catalogBatchProcess } from "./catalogBatchProcess";

describe('catalogBatchProcess', () => {
  afterEach(() => {
    AWSMock.restore();
  });

  it('response include description', async () => {
    AWS.config.update({region: 'eu-west-1'});
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('DynamoDB.DocumentClient', 'Put', '');
    AWSMock.mock('SNS', 'publish', '');

    const event = {
      Records: [{
        body: '{"Title":"Some product", "Description":"Some description", "Price":"1000", "Count":"10"}'
      }]
    }
    const result = await catalogBatchProcess(event)
    expect(JSON.parse(result.body).description).toBe("Some description")
  });

  it('response include description', async () => {
    AWS.config.update({region: 'eu-west-1'});
    AWSMock.setSDKInstance(AWS);
    AWSMock.mock('DynamoDB.DocumentClient', 'Put', '');
    AWSMock.mock('SNS', 'publish', '');

    const event = {
      Records: [{
        body: '{"Title":"Some product", "Description":"Some description", "Price":"1000", "Count":"10"}'
      }]
    }
    const result = await catalogBatchProcess(event)
    expect(JSON.parse(result.body).title).toBe("Some product")
  });
})