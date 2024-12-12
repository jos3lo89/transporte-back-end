import { IsString, IsInt, IsDate, IsUUID, IsEnum, IsNotEmpty, Min, Max } from 'class-validator';
import { TipoEncomienda } from '../enums/encomienda.enum'; // Suponiendo que `TipoEncomienda` es un enum

export class CreateEncomiendaDto {
  @IsString()
  @IsNotEmpty()
  emisor_nombres: string;

  @IsString()
  @IsNotEmpty()
  num_doc_emisor: string;

  @IsString()
  @IsNotEmpty()
  num_telefono_emisor: string;

  @IsString()
  @IsNotEmpty()
  receptor_nombres: string;

  @IsString()
  @IsNotEmpty()
  num_doc_receptor: string;

  @IsString()
  @IsNotEmpty()
  num_telefono_receptor: string;

  @IsEnum(TipoEncomienda)
  tipo: TipoEncomienda;

  @IsString()
  @IsNotEmpty()
  codigo_recogida: string;

  @IsInt()
  @Min(1)
  peso_kilos: number;

  @IsString()
  @IsNotEmpty()
  descripcion: string;

  // @IsInt()
  // @Min(0)
  // precio_unidad: number;

  @IsInt()
  @Min(0)
  precio_total: number;

  // @IsInt()
  // @Min(1)
  // cantidad: number;

  // @IsUUID()
  @IsNotEmpty()
  terminal_origen_id: string;

  // @IsUUID()
  @IsNotEmpty()
  terminal_destino_id: string;

  // @IsDate()
  // fecha_hora_envio: Date;
}
