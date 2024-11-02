import { IsNotEmpty, IsString, IsEnum, IsInt, Min, Max, Length } from 'class-validator';

export enum TiposDocumento {
  DNI = 'DNI',
  PASAPORTE = 'Pasaporte',
}

export enum Ciudades {
  Andahuaylas = 'Andahuaylas',
  Abancay = 'Abancay',
  Ayacucho = 'Ayacucho',
}

export class CreatePasajeroDto {
  @IsNotEmpty({ message: 'El nombre es obligatorio.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  nombres: string;

  @IsNotEmpty({ message: 'El apellido es obligatorio.' })
  @IsString({ message: 'El apellido debe ser una cadena de texto.' })
  apellidos: string;

  @IsNotEmpty({ message: 'El tipo de documento es obligatorio.' })
  @IsEnum(TiposDocumento, { message: 'Tipo de documento inválido.' })
  tipo_documento: TiposDocumento;

  @IsNotEmpty({ message: 'El número de documento es obligatorio.' })
  @IsString({ message: 'El número de documento debe ser una cadena de texto.' })
  @Length(8, 12, { message: 'El número de documento debe tener entre 8 y 12 caracteres.' })
  num_documento: string;

  @IsNotEmpty({ message: 'El destino es obligatorio.' })
  @IsEnum(Ciudades, { message: 'Ciudad de destino inválida.' })
  destino: Ciudades;

  @IsNotEmpty({ message: 'El número de asiento es obligatorio.' })
  @IsInt({ message: 'El número de asiento debe ser un número entero.' })
  @Min(1, { message: 'El número de asiento debe ser mayor o igual a 1.' })
  @Max(50, { message: 'El número de asiento no puede superar los 50.' })
  num_asiento: number;

  @IsNotEmpty({ message: 'El ID del viaje es obligatorio.' })
  @IsString({ message: 'El ID del viaje debe ser una cadena de texto.' })
  viaje_id: string;
}
