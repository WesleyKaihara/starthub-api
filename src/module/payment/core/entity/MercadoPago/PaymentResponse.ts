export class BankInfo {
  is_same_bank_account_owner: boolean;
}

export class ChargesDetails {
  from: string;
  to: string;
  original: number;
  refunded: number;
  client_id: number;
  date_created: string;
  id: string;
  last_updated: string;
  metadata: any;
  name: string;
  refund_charges: any[];
  reserve_id: any;
  type: string;
}

export class PayerIdentification {
  number: string;
  type: string;
}

export class PayerPhone {
  number: string;
  extension: string;
  area_code: string;
}

export class Payer {
  email: string;
  entity_type: any;
  first_name: any;
  id: string;
  identification: PayerIdentification;
  last_name: any;
  operator_id: any;
  phone: PayerPhone;
  type: any;
}

export class PaymentMethod {
  id: string;
  issuer_id: string;
  type: string;
}

export class PointOfInteractionApplicationData {
  name: any;
  version: any;
}

export class PointOfInteractionBusinessInfo {
  sub_unit: string;
  unit: string;
}

export class PointOfInteractionLocation {
  source: any;
  state_id: any;
}

export class PointOfInteraction {
  application_data: PointOfInteractionApplicationData;
  business_info: PointOfInteractionBusinessInfo;
  location: PointOfInteractionLocation;
  sub_type: string;
  transaction_data: any;
}

export class TransactionDetails {
  acquirer_reference: any;
  bank_transfer_id: number;
  external_resource_url: any;
  financial_institution: string;
  installment_amount: number;
  net_received_amount: number;
  overpaid_amount: number;
  payable_deferral_period: any;
  payment_method_reference_id: any;
  total_paid_amount: number;
  transaction_id: string;
}

export interface PaymentResponse {
  accounts_info: any;
  acquirer_reconciliation: any[];
  additional_info: any;
  authorization_code: any;
  binary_mode: boolean;
  brand_id: any;
  build_version: string;
  call_for_authorize_id: any;
  callback_url: any;
  captured: boolean;
  card: any;
  charges_details: ChargesDetails[];
  collector_id: number;
  corporation_id: any;
  counter_currency: any;
  coupon_amount: number;
  currency_id: string;
  date_approved: string;
  date_created: string;
  date_last_updated: string;
  date_of_expiration: string;
  deduction_schema: any;
  description: string;
  differential_pricing_id: any;
  external_reference: any;
  fee_details: any[];
  financing_group: any;
  id: number;
  installments: number;
  integrator_id: any;
  issuer_id: string;
  live_mode: boolean;
  marketplace_owner: any;
  merchant_account_id: any;
  merchant_number: any;
  metadata: any;
  money_release_date: string;
  money_release_schema: any;
  money_release_status: string;
  notification_url: any;
  operation_type: string;
  order: any;
  payer: Payer;
  payment_method: PaymentMethod;
  payment_method_id: string;
  payment_type_id: string;
  platform_id: any;
  point_of_interaction: PointOfInteraction;
  pos_id: any;
  processing_mode: string;
  refunds: any[];
  shipping_amount: number;
  sponsor_id: any;
  statement_descriptor: any;
  status: string;
  status_detail: string;
  store_id: any;
  tags: any;
  taxes_amount: number;
  transaction_amount: number;
  transaction_amount_refunded: number;
  transaction_details: TransactionDetails;
}
