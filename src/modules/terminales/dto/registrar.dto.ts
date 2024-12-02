import { IsEnum, IsNotEmpty } from 'class-validator';

export class UbicacionTerminalDto {
  @IsNotEmpty({ message: 'El campo ciudades no puede estar vacío.' })
  @IsEnum(['Andahuaylas', 'Abancay', 'Ayacucho'], {
    message: 'La ciudad debe ser una de las siguientes: Andahuaylas, Abancay o Ayacucho.',
  })
  ciudades: 'Andahuaylas' | 'Abancay' | 'Ayacucho';
}
