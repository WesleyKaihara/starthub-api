export default class Payment {
  userId: number;
  productId: number;
  status: string;
  paymentMethod: string;
  value: number;

  static restore(
    userId: number,
    productId: number,
    status: string,
    paymentMethod: string,
    value: number,
  ): Payment {
    const payment = new Payment();
    payment.userId = userId;
    payment.productId = productId;
    payment.status = status;
    payment.paymentMethod = paymentMethod;
    payment.value = value;
    return payment;
  }
}
