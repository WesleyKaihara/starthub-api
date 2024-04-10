import { Module } from '@nestjs/common';
import PaymentService from './shared/service/payment.service';
import { PaymentController } from './http/payment.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 3,
    }),
  ],
  providers: [PaymentService],
  controllers: [PaymentController],
})
export class PaymentModule {}
