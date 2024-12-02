import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ReniecService {
  async getingData(dni: string) {
    try {
      const res = await fetch(`https://api.apis.net.pe/v1/dni?numero=${dni}`);
      const data = await res.json();

      if (!res.ok) {
        throw new HttpException('Error al consultar los datos', HttpStatus.BAD_REQUEST);
      }

      return data;
    } catch (error) {
      console.log(error);

      throw error;
    }
  }
}
