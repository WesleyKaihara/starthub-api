export class Identification {
  type: string;
  number: string;
}

export class Payer {
  email: string;
  entity_type: any;
  first_name: null;
  id: number;
  identification: Identification;
  last_name: string;
  operator_id: number;
  phone: {
    number: number;
    extension: number;
    area_code: number;
  };
  type: string;
}
