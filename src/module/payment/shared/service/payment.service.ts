import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GeneratePix, VerifyPayment } from '@payment/core/useCase';
import { PixRequest } from '@payment/core/entity/MercadoPago/Pix';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

@Injectable()
export default class PaymentService {
  constructor(private readonly httpService: HttpService) {}

  generatePix(pixRequest: PixRequest): Observable<AxiosResponse<any[]>> {
    const generatePix = new GeneratePix(this.httpService);
    return generatePix.execute(pixRequest);
  }

  async verifyPayment(paymentId: number) {
    const verifyPayment = new VerifyPayment(this.httpService);
    return await verifyPayment.execute(paymentId);
  }
}
