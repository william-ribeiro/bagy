interface IStock {
  product_id: number;
  quantity: number;
}

export interface IProduct {
  id?: number;
  created_at?: Date;
  updated_at?: Date;
  name?: string;
  image_url?: string;
  description?: string;
  weight?: number;
  price?: number;
  stock?: number;
}

export function checkStock(products: IProduct[], data: IStock) {
  const findProduct = products.find((get) => get.id === data.product_id);

  if (!findProduct) {
    console.log('ATENÇÃO produto nao existe', { id: data.product_id });
    return;
  }

  if (findProduct.stock === 0) {
    console.log('ATENÇÃO produto com estoque zerado', {
      id: findProduct.id,
      nome: findProduct.name,
      estoque: findProduct.stock,
    });
    return;
  }

  if (findProduct.stock < data.quantity) {
    console.log('ATENÇÃO a quantidade informada é maior que a disponível em estoque', {
      id: findProduct.id,
      nome: findProduct.name,
      estoque: findProduct.stock,
      quantidade: data.quantity,
    });
    return false;
  }
  return findProduct;
}
