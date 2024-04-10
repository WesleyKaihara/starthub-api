import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import PaymentService from '@payment/shared/service/payment.service';
import { PixRequest } from '@payment/core/entity/MercadoPago/Pix';

@Controller('/payment')
@ApiTags('Payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/pix')
  generatePix(@Body() pixRequest: PixRequest, @Res() response: Response) {
    try {
      const payment = this.paymentService.generatePix(pixRequest);
      return response.json(payment);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  @Get('/verify/:paymentId')
  async verifyPayment(
    @Param('paymentId', new ParseIntPipe()) paymentId: number,
    @Res() response: Response,
  ) {
    try {
      const payment = await this.paymentService.verifyPayment(paymentId);
      return response.json(payment);
    } catch (error) {
      if (error.response?.data?.status === 401) {
        return response.status(401).json({
          mensagem: 'Payment verification was not allowed',
        });
      } else if (error.response?.data?.status === 404) {
        return response.status(404).json({
          mensagem: 'Payment Not Found',
        });
      }

      return response.status(500).json({
        mensagem: error.message,
      });
    }
  }
}
