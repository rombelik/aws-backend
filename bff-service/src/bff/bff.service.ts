import { Injectable, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { product, cart, order, profile } from 'src/constants';

@Injectable()
export class BffService {
  async getRequest(path, method, body) {
    let url = '';

    switch (path) {
      case 'product': {
        url = product;
        break;
      }
      case 'cart': {
        url = cart;
        break;
      }
      case 'order': {
        url = order;
        break;
      }
      case 'profile': {
        url = profile;
        break;
      }
      default: {
        return {
          statusCode: 502,
          message: 'Internal Error',
        };
        break;
      }
    }

    const resp = await axios({
      method: method,
      url: url,
      data: method !== 'GET' ? body : null,
    });
    return resp.data;
  }

  async getRequestId(id, path, method, body) {
    let url = '';

    switch (path) {
      case 'product': {
        url = product.concat('/', id);
        break;
      }
      case 'cart': {
        url = cart.concat('/', id);
        break;
      }
      case 'order': {
        url = order.concat('/', id);
        break;
      }
      case 'profile': {
        url = profile.concat('/', id);
        break;
      }
      default: {
        return {
          statusCode: 502,
          message: 'Internal Error',
        };
        break;
      }
    }

    const resp = await axios({
      method: method,
      url: url,
      data: method !== 'GET' ? body : null,
    });
    return resp.data;
  }
}
