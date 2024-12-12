import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CredencialesService {
  email: string = '';
  password: string = '';

  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: this.email,
      pass: this.password, // mandar a las varialbles de entorno
    },
  });

  constructor() {
    this.email = process.env.EMAIL;
    this.password = process.env.PASSWORD;
  }

  async sendMail(email: string, username: string, clave: string) {
    try {
      const info = await this.transporter.sendMail({
        from: `"El apurimeño" ${this.email}`,
        to: email,
        subject: 'Credenciales de Acceso',
        html: `<div
      style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 10px; border-radius: 10px; color: #333"
    >
      <div style="display: flex; gap: 10px">
        <img
          src="https://res.cloudinary.com/ddqdwtsn6/image/upload/v1732600023/transportes/Portada_ykx5iz.jpg"
          alt="El Apurimeño"
          style="width: 100px; height: auto; margin-bottom: 15px; border-radius: 5px"
        />

        <div  style="margin-left: 20px">
          <h2 style="color: #4caf50; margin-top: 0">Hola,</h2>
          <p>¡Saludos cordiales!<br />El equipo de El Apurimeño</p>
        </div>
      </div>
      <p>Sus credenciales de acceso son:</p>

      <div style="display: flex; justify-content: space-between">
        <div
          style="
            flex: 1;
            border: 1px solid #ddd;
            border-radius: 8px;
            background-color: #f5f5f5;
            text-align: center;
            margin-right: 10px;
            padding-right: 10px;
            padding-left: 10px
          "
        >
          <p style="font-size: 14px; font-weight: bold; color: #555; margin-bottom: 5px">Usuario</p>
          <p style="font-size: 16px; color: #333; margin: 0; font-weight: bold">${username}</p>
        </div>
        <div
          style="
            flex: 1;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 10px;
            background-color: #f5f5f5;
            text-align: center;
            margin: 0 10px;
            padding-right: 10px;
            padding-left: 10px
          "
        >
          <p style="font-size: 14px; font-weight: bold; color: #555; margin-bottom: 5px">Contraseña</p>
          <p style="font-size: 16px; color: #333; margin: 0; font-weight: bold">${clave}</p>
        </div>
      </div>
    </div>`,
      });

      console.log('correo enviado', info);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  }
}
