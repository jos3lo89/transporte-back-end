import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class CredencialesService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Cambia esto a 'smtp.gmail.com'
    port: 587, // Usa 587 para TLS
    secure: false, // true para port 465, false para otros puertos
    auth: {
      user: 'pma.mode.18@gmail.com', // Tu dirección de correo de Gmail
      pass: 'dcqy uinx pcvm onun', // Tu contraseña de Gmail o contraseña específica de aplicación
    },
  });

  async sendMail(email: string, username: string, clave: string) {
    try {
      const info = await this.transporter.sendMail({
        from: '"El apurimeño" pma.mode.18@gmail.com',
        to: email,
        subject: 'Sus Credenciales de Acceso', // Subject line
        html: `<div
      style="font-family: Arial, sans-serif; background-color: #f9f9f9; padding: 10px; border-radius: 10px; color: #333"
    >
      <div style="display: flex; gap: 10px">
        <img
          src="https://i.pinimg.com/564x/4a/00/ee/4a00ee5a5a9ac67a26fc0d3e44123dab.jpg"
          alt="Logo de El Apurimeño"
          style="width: 100px; height: auto; margin-bottom: 15px; border-radius: 5px"
        />

        <div>
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
          "
        >
          <p style="font-size: 14px; font-weight: bold; color: #555; margin-bottom: 5px">Contraseña</p>
          <p style="font-size: 16px; color: #333; margin: 0; font-weight: bold">${clave}</p>
        </div>
      </div>
    </div>`,
      });

      console.log('info wadafa', info);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw error;
    }
  }
}
