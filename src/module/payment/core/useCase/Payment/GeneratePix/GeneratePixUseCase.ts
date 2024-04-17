import { HttpService } from '@nestjs/axios';
import { PixRequest } from '@payment/core/entity/MercadoPago/Pix';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';

export class GeneratePix {
  constructor(private readonly httpService: HttpService) {}

  execute(pixRequest: PixRequest): Observable<AxiosResponse<any[]>> {
    return this.httpService.post(
      'https://api.mercadopago.com/v1/payments',
      pixRequest,
    );
  }
}
