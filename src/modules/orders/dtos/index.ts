export interface IOrderDTO {
  customer_id: number;
  installments: number;
  products?: IOrderProductDTO[];
  total?: number;
  status?: 'request' | 'in_progress' | 'recused' | 'delivered' | 'cancelled';
}

export interface IOrderProductDTO {
  order_id?: number;
  product_id: number;
  quantity: number;
  price?: number;
}
