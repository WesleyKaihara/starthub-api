import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ZodError } from 'zod';

import PaymentService from '@payment/core/service/payment.service';

@Controller('/payment')
@ApiTags('Payment')
export class ProjectController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  async getAllPayments(@Res() response: Response) {
    try {
      const payments = await this.paymentService.getAllPayments();
      return response.json(payments);
    } catch (error) {
      return response.status(500).json({ message: error.message });
    }
  }

  @Get('/:paymentId')
  async getPaymentById(
    @Param('paymentId', new ParseIntPipe()) paymentId: number,
    @Res() response: Response,
  ) {
    const payment = await this.paymentService.getPaymentById();
    // if (!payment) {
    //   return response.status(404).send({
    //     message: `Unable to find a payment with id ${paymentId}.`,
    //   });
    // }
    return response.json(payment);
  }
}
