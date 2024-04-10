import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

export default class VerifyPayment {
  constructor(private readonly httpService: HttpService) {}

  execute(paymentId: number): Observable<AxiosResponse<any, any>> {
    return this.httpService.get<AxiosResponse<any, any>>(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
        },
      },
    );
  }
}
