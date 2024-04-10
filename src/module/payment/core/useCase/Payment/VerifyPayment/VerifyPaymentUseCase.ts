import { HttpService } from '@nestjs/axios';
import { PaymentResponse } from '@payment/core/entity/MercadoPago/PaymentResponse';
import Payment from '@payment/core/entity/Payment';
import { firstValueFrom, map } from 'rxjs';

export default class VerifyPayment {
  constructor(private readonly httpService: HttpService) {}

  async execute(paymentId: number): Promise<Payment> {
    const request = this.httpService.get<PaymentResponse>(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.MERCADO_PAGO_TOKEN}`,
        },
      },
    );

    // pipe - Manipular o fluxo de dados da resposta.
    // map - Transformar a resposta completa em apenas os dados relevantes (response.data).
    // firstValueFrom - Aguardar e obter o primeiro valor emitido pelo fluxo de dados.
    const response = await firstValueFrom(
      request.pipe(map((response) => response.data)),
    );

    const payment: Payment = Payment.restore(
      99999,
      99999,
      response.status,
      response.payment_method_id,
      response.transaction_details.total_paid_amount,
    );

    return payment;
  }
}
