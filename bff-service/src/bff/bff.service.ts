import { Injectable, HttpStatus } from '@nestjs/common';

@Injectable()
export class BffService {
  async getRequest(path, method, body) {
    console.log('path', path);
    console.log('method', method);
    await console.log('body', body);
    return {
      statusCode: 201,
      message: 'OKOKOK',
    };
  }

  async getRequestId(id, path, method, body) {
    console.log('id', id);
    console.log('path', path);
    console.log('method', method);
    await console.log('body', body);
    return {
      statusCode: 201,
      message: 'OKOKOK',
    };
  }
}