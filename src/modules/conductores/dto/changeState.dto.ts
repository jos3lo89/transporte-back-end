import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class StateDto {
  @IsNotEmpty({ message: 'Estado requerido' })
  @IsEnum(['ACTIVO', 'INACTIVO'])
  state: 'ACTIVO' | 'INACTIVO';
}
