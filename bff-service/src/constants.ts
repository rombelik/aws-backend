export const cart =
  process.env.CART ||
  'http://rombelik-cart-api-dev.eu-west-1.elasticbeanstalk.com/api/profile/cart';

export const product =
  process.env.PRODUCT ||
  'https://23ld61bqe2.execute-api.eu-west-1.amazonaws.com/products';

export const order =
  process.env.ORDER ||
  'http://rombelik-cart-api-dev.eu-west-1.elasticbeanstalk.com/api/order';

export const profile =
  process.env.PROFILE ||
  'http://rombelik-cart-api-dev.eu-west-1.elasticbeanstalk.com/api/profiles';
