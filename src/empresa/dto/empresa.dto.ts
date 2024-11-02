import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RegistrarEmpresaDto {
  @IsNotEmpty({ message: 'El nombre comercial es obligatorio.' })
  @IsString({ message: 'El nombre comercial debe ser una cadena de texto.' })
  nombre_comercial: string;

  @IsNotEmpty({ message: 'La razón social es obligatoria.' })
  @IsString({ message: 'La razón social debe ser una cadena de texto.' })
  razon_social: string;

  @IsNotEmpty({ message: 'El RUC es obligatorio.' })
  @IsString({ message: 'El RUC debe ser una cadena de texto.' })
  ruc: string;

  @IsNotEmpty({ message: 'La dirección es obligatoria.' })
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  direccion: string;

  @IsNotEmpty({ message: 'El departamento es obligatorio.' })
  @IsString({ message: 'El departamento debe ser una cadena de texto.' })
  departamento: string;

  @IsNotEmpty({ message: 'La provincia es obligatoria.' })
  @IsString({ message: 'La provincia debe ser una cadena de texto.' })
  provincia: string;

  @IsNotEmpty({ message: 'El distrito es obligatorio.' })
  @IsString({ message: 'El distrito debe ser una cadena de texto.' })
  distrito: string;

  @IsNotEmpty({ message: 'El teléfono es obligatorio.' })
  @IsString({ message: 'El teléfono debe ser de caracteres.' })
  telefono: string;

  @IsNotEmpty({ message: 'El email es obligatorio.' })
  @IsString({ message: 'El email debe ser una cadena de texto.' })
  @IsEmail({}, { message: 'El email debe tener un formato válido.' })
  email: string;

  @IsNotEmpty({ message: 'El sitio web es obligatorio.' })
  @IsString({ message: 'El sitio web debe ser una cadena de texto.' })
  sitio_web: string;

  @IsNotEmpty({ message: 'El tipo de empresa es obligatorio.' })
  @IsString({ message: 'El tipo de empresa debe ser una cadena de texto.' })
  tipo_empresa: string;

  @IsNotEmpty({ message: 'La licencia MTC es obligatoria.' })
  @IsString({ message: 'La licencia MTC debe ser una cadena de texto.' })
  licencia_mtc: string;

  @IsNotEmpty({ message: 'La fecha de licencia es obligatoria.' })
  @IsString({ message: 'La fecha de licencia debe ser una cadena de texto.' })
  fecha_licencia: string;

  @IsNotEmpty({ message: 'La fecha de fundación es obligatoria.' })
  @IsString({ message: 'La fecha de fundación debe ser una cadena de texto.' })
  fecha_fundacion: string;

  @IsNotEmpty({ message: 'El logo URL es obligatorio.' })
  @IsString({ message: 'El logo URL debe ser una cadena de texto.' })
  logo_url: string;
}
