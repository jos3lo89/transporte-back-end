import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class RegistrarRutaDto {
  @IsNotEmpty({ message: 'La duración es obligatoria.' })
  @IsNumber({}, { message: 'La duración debe ser un número.' })
  @Min(1, { message: 'La duración debe ser al menos 1 minuto.' })
  duracion: number;

  @IsNotEmpty({ message: 'La distancia en kilómetros es obligatoria.' })
  @IsNumber({}, { message: 'La distancia debe ser un número.' })
  @Min(0.01, { message: 'La distancia debe ser al menos 0.01 km.' })
  distancia_km: number;

  @IsNotEmpty({ message: 'El ID de origen es obligatorio.' })
  @IsString({ message: 'El ID de origen debe ser una cadena de texto.' })
  origen_id: string;

  @IsNotEmpty({ message: 'El ID de destino es obligatorio.' })
  @IsString({ message: 'El ID de destino debe ser una cadena de texto.' })
  destino_id: string;
}
