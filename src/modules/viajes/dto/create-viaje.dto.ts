import { IsNotEmpty, IsString, IsDateString, IsNumber, Min } from 'class-validator';

export class CreateViajeDto {
  @IsNotEmpty({ message: 'La fecha y hora son obligatorias.' })
  @IsDateString({}, { message: 'La fecha debe estar en un formato de fecha y hora válido (YYYY-MM-DDTHH:MM:SS).' })
  fecha: string;

  @IsNotEmpty({ message: 'El precio es obligatorio.' })
  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @Min(0, { message: 'El precio debe ser mayor o igual a 0.' })
  precio: number;

  @IsNotEmpty({ message: 'El ID de la ruta es obligatorio.' })
  @IsString({ message: 'El ID de la ruta debe ser una cadena de texto.' })
  ruta_id: string;

  @IsNotEmpty({ message: 'El ID del vehículo es obligatorio.' })
  @IsString({ message: 'El ID del vehículo debe ser una cadena de texto.' })
  vehiculo_id: string;

  @IsNotEmpty({ message: 'El ID del conductor es obligatorio.' })
  @IsString({ message: 'El ID del conductor debe ser una cadena de texto.' })
  conductor_id: string;
}
