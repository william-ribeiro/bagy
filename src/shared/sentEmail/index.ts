import transporter from '../../config/email';
import { EntityRepository, getRepository, Repository } from 'typeorm';

import { Product } from '../../modules/products/entities/Product';
import { OrderProduct } from '../../modules/orders/entities/OrderProduct';

interface IData {
  order_id?: number;
  name?: string;
  email?: string;
  orders_products?: OrderProduct[];
  total?: number;
  description?: string;
  formatPrice?: string;
  formatTotal?: string;
  quantity?: number;
}

@EntityRepository(Product)
export class SendEmail {
  private repository: Repository<Product>;

  constructor() {
    this.repository = getRepository(Product);
  }

  public async Email({ order_id, name, email, total, orders_products }: IData): Promise<IData> {
    try {
      const formatTotal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(total);

      const body = await this.makeTemplate(name, order_id, orders_products, formatTotal);

      console.log('####################################################');
      console.log('#                  Send e-mail....                 #');
      console.log('####################################################');

      const status = await transporter.sendMail({
        from: 'bernadette.barton68@ethereal.email',
        to: `${email}`,
        subject: 'Comprovante de Pedido',
        html: `${body}`,
      });

      console.warn(status);
      return;
    } catch (error) {
      console.log('error', error);
    }
  }

  async getProducts(product_id: number): Promise<Product> {
    return this.repository.findOne(product_id);
  }

  async makeTemplate(
    name: string | null,
    order_id: number,
    orders_products: OrderProduct[],
    total: string,
  ) {
    let count = 1;
    let products: IData[] = [];

    for (const o of orders_products) {
      let { name, price, description } = await this.getProducts(o.product_id);
      const total = price * o.quantity;

      const formatPrice = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price);

      const formatTotal = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(total);
      products.push({ name, description, formatPrice, quantity: o.quantity, formatTotal });
    }

    const records = products
      .map(
        (t) => `
      <tr style="background-color: rgb(255, 255, 255)">
      <td style="width: 48px;border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171);
        box-sizing: border-box; word-break: break-word; white-space: normal;"> ${count++}
      </td>
      <td style="width: 272px; height: 26px; border-width: 1px; border-style: solid; border-color:
        rgb(171, 171, 171); box-sizing: border-box; word-break: break-word; white-space: normal;">
          ${t.name}
      </td>
      <td style="width: 442px;border-width: 1px; border-style: solid; border-color:
        rgb(171, 171, 171); box-sizing: border-box; word-break: break-word; white-space: normal;">
        ${t.description}
      </td>
      <td style="width: 164px;border-width: 1px; border-style: solid; border-color:
        rgb(171, 171, 171); box-sizing: border-box; word-break: break-word; white-space: normal;">
        ${t.formatPrice}
      </td>
      <td style="width: 164px;border-width: 1px; border-style: solid; border-color:
        rgb(171, 171, 171); box-sizing: border-box; word-break: break-word; white-space: normal;">
        ${t.quantity}
      </td>
      <td style="width: 264px;border-width: 1px; border-style: solid; border-color:
        rgb(171, 171, 171); box-sizing: border-box; word-break: break-word; white-space: normal;">
        ${t.formatTotal}
      </td>
    </tr>
      `,
      )
      .join('\n');

    return `
      <h1>Notificação via Bagy!</h1>
      <div>
        <div>
          <div>
            <div
              dir="ltr"
              role="textbox"
              aria-multiline="true"
              aria-label="Corpo da mensagem"
              contenteditable="true"
              style="user-select: text; color: rgb(0, 0, 0); background-color: rgb(255, 255, 255)">
                <div style=" font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);">
                  <span style="font-size: 14pt"><b>Olá ${name}!</b></span>
              </div>
                <div style=" font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);">
                  <br />
                <div>
              <div style=" font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);">
                Estamos enviando as informações do pedido que você efetuou.
              </div>
              <div style=" font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);">
                <br />
              </div>
              <div style=" font-family: Calibri, Arial, Helvetica, sans-serif; font-size: 12pt; color: rgb(0, 0, 0);">
                <u>PEDIDO: ${order_id}</u><br /><br />
                <table cellspacing="0" cellpadding="1" style=" text-align: center; border-collapse: collapse;
                  box-sizing: border-box; width: 927px;">
                  <tbody>
                    <tr style="background-color: rgb(255, 255, 255)">
                      <td style=" width: 48px; height: 25px;border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); box-sizing: border-box; word-break: break-word; white-space: normal;">
                        <b style="background-color: rgb(255, 255, 255)">Nr.</b>
                      </td>
                      <td style=" width: 272px; height: 25px;border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); box-sizing: border-box; word-break: break-word; white-space: normal;">
                        <b>Produto</b>
                      </td>
                      <td style=" width: 442px; height: 25px;border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); box-sizing: border-box; word-break: break-word; white-space: normal;">
                          <b>Descrição</b>
                      </td>
                      <td style=" width: 164px; height: 25px;border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); box-sizing: border-box; word-break: break-word; white-space: normal;">
                          <b>Preço</b><br />
                      </td>
                      <td style=" width: 164px; height: 25px;border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); box-sizing: border-box; word-break: break-word; white-space: normal;">
                          <b>Quantidade</b><br />
                      </td>
                      <td style=" width: 264px; height: 25px;border-width: 1px; border-style: solid; border-color: rgb(171, 171, 171); box-sizing: border-box; word-break: break-word; white-space: normal;">
                          <b>Total</b><br />
                      </td>
                    </tr>
  
                    ${records}
                   
                    <td  COLSPAN="5" style="  width: 48px; height: 25px;border-width: 1px;
                      border-style:  solid; border-color: rgb(171, 171, 171); box-sizing: border-box; word-break: break-word; white-space: normal;">
                      <b>Valor Total</b>
                    </td>
                    <td style=" width: 264px; height: 25px;border-width: 1px; border-style:
                      solid; border-color: rgb(171, 171, 171); box-sizing: border-box; word-break: break-word; white-space: normal;">
                      <b>${total}</b><br />
                    </td>
                  </tbody>
                </table>
                <br />
              </div>
          </body>
      `;
  }
}
