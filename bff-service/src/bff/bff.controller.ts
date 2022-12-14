import { Controller, All, Req, Param, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { BffService } from './bff.service';


@Controller('/')
export class BffController {
  constructor(private readonly bffService: BffService) {}

  @All('/:path')
  async getRequest(@Req() req: Request, @Param() params) {
    const path = params.path;
    const { body, method } = req;
    const response = await this.bffService.getRequest(path, method, body);
    return response;
  }

  @All('/:path/:id')
  async getRequestId(@Req() req: Request, @Param() params) {
    const path = params.path;
    const id = params.id;
    const { body, method } = req;
    const response = await this.bffService.getRequestId(id, path, method, body);
    return response;
  }
}