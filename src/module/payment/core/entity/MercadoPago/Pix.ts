import { Payer } from './Payer';

export class PixRequest {
  transaction_amount: number;
  description: string;
  payment_method_id: string;
  payer: Payer;
}
