import { IsNotEmpty, IsString, IsEmail, IsEnum, IsDateString } from 'class-validator';

export enum TipoDocumento {
  DNI = 'DNI',
  PASAPORTE = 'Pasaporte',
}

export enum Generos {
  MASCULINO = 'MASCULINO',
  FEMENINO = 'FEMENINO',
}

export class RegistroConductorDto {
  @IsNotEmpty({ message: 'Los nombres son obligatorios.' })
  @IsString({ message: 'Los nombres deben ser una cadena de texto.' })
  nombres: string;

  @IsNotEmpty({ message: 'Los apellidos son obligatorios.' })
  @IsString({ message: 'Los apellidos deben ser una cadena de texto.' })
  apellidos: string;

  @IsNotEmpty({ message: 'El tipo de documento es obligatorio.' })
  @IsEnum(TipoDocumento, { message: 'El tipo de documento debe ser DNI o Pasaporte.' })
  tipo_documento: TipoDocumento;

  @IsNotEmpty({ message: 'El número de documento es obligatorio.' })
  @IsString({ message: 'El número de documento debe ser una cadena de texto.' })
  num_documento: string;

  @IsNotEmpty({ message: 'El género es obligatorio.' })
  @IsEnum(Generos, { message: 'El género debe ser MASCULINO o FEMENINO.' })
  genero: Generos;

  @IsNotEmpty({ message: 'La fecha de nacimiento es obligatoria.' })
  @IsDateString({}, { message: 'La fecha de nacimiento debe estar en formato de fecha.' })
  fecha_nacimiento: string;

  @IsNotEmpty({ message: 'El número de celular es obligatorio.' })
  @IsString({ message: 'El número de celular debe ser una cadena de texto.' })
  celular: string;

  @IsNotEmpty({ message: 'El correo electrónico es obligatorio.' })
  @IsString({ message: 'El correo electrónico debe ser una cadena de texto.' })
  @IsEmail({}, { message: 'El correo electrónico debe tener un formato válido.' })
  email: string;

  @IsNotEmpty({ message: 'La dirección de domicilio es obligatoria.' })
  @IsString({ message: 'La dirección de domicilio debe ser una cadena de texto.' })
  direccion_domicilio: string;

  // @IsNotEmpty({ message: 'El departamento es obligatorio.' })
  // @IsString({ message: 'El departamento debe ser una cadena de texto.' })
  // departamento: string;

  // @IsNotEmpty({ message: 'La provincia es obligatoria.' })
  // @IsString({ message: 'La provincia debe ser una cadena de texto.' })
  // provincia: string;

  // @IsNotEmpty({ message: 'El distrito es obligatorio.' })
  // @IsString({ message: 'El distrito debe ser una cadena de texto.' })
  // distrito: string;

  // @IsNotEmpty({ message: 'La URL de la foto es obligatoria.' })
  // @IsString({ message: 'La URL de la foto debe ser una cadena de texto.' })
  // foto_url: string;

  @IsNotEmpty({ message: 'La licencia es obligatoria.' })
  @IsString({ message: 'La licencia debe ser una cadena de texto.' })
  licencia: string;
}
