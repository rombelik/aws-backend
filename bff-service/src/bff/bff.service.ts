import { Injectable, CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import axios from 'axios';
import { product, cart, order, profile } from 'src/constants';

@Injectable()
export class BffService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

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

    let resp;
    let getValue;
    let setValue;

    if (path === 'product' && method === 'GET') {
      const result = await this.cacheManager.get('productList')

      if (result == (null || undefined)) {
        console.log('get data from DB ------------------->');
        resp = await axios({
          method: method,
          url: url,
          data: null,
        });
        await this.cacheManager.set('productList', resp.data, 120000);
        return resp.data;
      } else {
        console.log('get data from cache ------------------->');
        return await this.cacheManager.get('productList');
      }
    } else {
      resp = await axios({
        method: method,
        url: url,
        data: method !== 'GET' ? body : null,
      });
      return resp.data;
    }
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
