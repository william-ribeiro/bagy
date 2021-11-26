import nodemailer from 'nodemailer';

export async function sendmail() {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'bernadette.barton68@ethereal.email',
        pass: 'fM9wCaRr5WYqVfUZ1n',
      },
    });

    const status = await transporter.sendMail({
      from: 'sbrdigital15@gmail.com',
      to: 'sbrvinhos@gmail.com',
      subject: 'Comprovante de Pedido',
      html: '<h1>Example HTML Message Body</h1>',
    });
    console.warn(status);
  } catch (error) {
    console.log('error', error);
  }
}
