import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBoletoDto {
  @IsNotEmpty({ message: 'El ID del pasajero es obligatorio.' })
  @IsString({ message: 'El ID del pasajero debe ser una cadena de texto.' })
  pasajero_id: string;

  @IsNotEmpty({ message: 'El ID del viaje es obligatorio.' })
  @IsString({ message: 'El ID del viaje debe ser una cadena de texto.' })
  viaje_id: string;
}
