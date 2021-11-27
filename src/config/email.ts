import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'bernadette.barton68@ethereal.email',
    pass: 'fM9wCaRr5WYqVfUZ1n',
  },
});

export default transporter;
