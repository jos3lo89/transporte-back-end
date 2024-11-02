import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { Conbustibles, TiposServicio } from '../enums/vehiculo.enum';

export class RegistrarVehiculoDto {
  @IsNotEmpty({ message: 'La tarjeta de circulación es obligatoria.' })
  @IsString({ message: 'La tarjeta de circulación debe ser una cadena de texto.' })
  tarjeta_de_circulacion: string;

  @IsNotEmpty({ message: 'El número de placa es obligatorio.' })
  @IsString({ message: 'El número de placa debe ser una cadena de texto.' })
  numero_de_placa: string;

  @IsNotEmpty({ message: 'La marca es obligatoria.' })
  @IsString({ message: 'La marca debe ser una cadena de texto.' })
  marca: string;

  @IsNotEmpty({ message: 'El modelo es obligatorio.' })
  @IsString({ message: 'El modelo debe ser una cadena de texto.' })
  modelo: string;

  @IsNotEmpty({ message: 'El año de fabricación es obligatorio.' })
  @IsNumber({}, { message: 'El año de fabricación debe ser un número.' })
  annio_de_fabricacion: number;

  @IsNotEmpty({ message: 'El color es obligatorio.' })
  @IsString({ message: 'El color debe ser una cadena de texto.' })
  color: string;

  @IsNotEmpty({ message: 'El número de motor es obligatorio.' })
  @IsString({ message: 'El número de motor debe ser una cadena de texto.' })
  numero_motor: string;

  @IsNotEmpty({ message: 'La cantidad de ruedas es obligatoria.' })
  @IsNumber({}, { message: 'La cantidad de ruedas debe ser un número.' })
  cantidad_ruedas: number;

  @IsNotEmpty({ message: 'El total de asientos es obligatorio.' })
  @IsNumber({}, { message: 'El total de asientos debe ser un número.' })
  total_asientos: number;

  @IsNotEmpty({ message: 'El total de pasajeros es obligatorio.' })
  @IsNumber({}, { message: 'El total de pasajeros debe ser un número.' })
  total_pasajeros: number;

  @IsNotEmpty({ message: 'El peso seco es obligatorio.' })
  @IsNumber({}, { message: 'El peso seco debe ser un número.' })
  peso_seco: number;

  @IsNotEmpty({ message: 'El peso bruto es obligatorio.' })
  @IsNumber({}, { message: 'El peso bruto debe ser un número.' })
  peso_bruto: number;

  @IsNotEmpty({ message: 'El ID del conductor es obligatorio.' })
  @IsString({ message: 'El ID del conductor debe ser una cadena de texto.' })
  conductor_id: string;

  @IsNotEmpty({ message: 'El tipo de combustible es obligatorio.' })
  @IsEnum(Conbustibles, { message: 'El tipo de combustible debe ser uno de los valores permitidos.' })
  tipo_combustible: Conbustibles;

  @IsNotEmpty({ message: 'El tipo de servicio es obligatorio.' })
  @IsEnum(TiposServicio, { message: 'El tipo de servicio debe ser uno de los valores permitidos.' })
  tipo_servicio: TiposServicio;
}
