import { middyfy } from '@libs/lambda';

// import schema from './schema';

const basicAuthorizer = async (event) => {

  const getAuthToken = (token: any): { userName: string; password: string } | null => {
    if (typeof token !== 'string') return null;

    console.log('token', Buffer.from(token, 'base64'))
  
    const decodedToken = Buffer.from(token, 'base64').toString('ascii');
    const result = decodedToken.split(':');
    const userName = result[0];
    const password = result[1];
  
    if (!userName || !password) return null;
  
    return { userName, password };
  };

  const returnPolicy = (action: 'Allow' | 'Deny', arn: string, userName?: string) => {
    return {
      principalId: userName ?? 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: action,
            Resource: arn,
          },
        ],
      },
    };
  };

  try {
    console.log(event.identitySource)
    const authHeaderValue = event.headers['Authorization'];
    const result = authHeaderValue.split(' ');
    const authType = result[0]
    const authToken = result[1]
    if (typeof authType !== 'string' || authType.toLowerCase() !== 'basic') return returnPolicy('Deny', event.methodArn);
    

    const tokenData = getAuthToken(authToken);
    if (!tokenData) return returnPolicy('Deny', event.methodArn);

    const { userName, password } = tokenData;
    const isPasswordCorrect = process.env[userName] === password;
    if (!isPasswordCorrect) return returnPolicy('Deny', event.methodArn);

    return returnPolicy('Allow', event.methodArn, userName);
  } catch (e) {
    console.log('Internal server error appeared', e);
    return returnPolicy('Deny', event.methodArn);
  }


};

export const main = middyfy(basicAuthorizer);
