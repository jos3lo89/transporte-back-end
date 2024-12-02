import { IsNotEmpty, IsString, IsInt, Min, Max, Length } from 'class-validator';

export class CreateEquipajeDto {
  @IsNotEmpty({ message: 'La descripción es obligatoria.' })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @Length(3, 100, { message: 'La descripción debe tener entre 3 y 100 caracteres.' })
  descripcion: string;

  @IsNotEmpty({ message: 'El peso en kilos es obligatorio.' })
  @IsInt({ message: 'El peso en kilos debe ser un número entero.' })
  @Min(1, { message: 'El peso en kilos debe ser mayor o igual a 1.' })
  @Max(50, { message: 'El peso en kilos no puede superar los 50.' })
  peso_kilo: number;

  @IsNotEmpty({ message: 'El ID del pasajero es obligatorio.' })
  @IsString({ message: 'El ID del pasajero debe ser una cadena de texto.' })
  pasajero_id: string;
}
