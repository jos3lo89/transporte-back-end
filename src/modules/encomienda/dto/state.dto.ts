import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

enum EstadoEncomienda {
  RECIBIDO = 'RECIBIDO',
  EN_RUTA = 'EN_RUTA',
  EN_DESTINO = 'EN_DESTINO',
  ENTREGADO = 'ENTREGADO',
}

export class StateEcomiendaDto {
  @IsEnum(EstadoEncomienda)
  state: EstadoEncomienda;

  @IsString()
  @IsNotEmpty()
  clave: string;
}
