import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Los nombres no pueden estar vacíos' })
  @IsString({ message: 'Los nombres deben ser una cadena de texto' })
  nombres: string;

  @IsNotEmpty({ message: 'Los apellidos no pueden estar vacíos' })
  @IsString({ message: 'Los apellidos deben ser una cadena de texto' })
  apellidos: string;

  @IsNotEmpty({ message: 'El tipo de documento no puede estar vacío' })
  @IsEnum(['DNI', 'Pasaporte'], { message: 'El tipo de documento debe ser "DNI" o "Pasaporte"' })
  tipo_documento: 'DNI' | 'Pasaporte';

  @IsNotEmpty({ message: 'El número de documento no puede estar vacío' })
  @IsString({ message: 'El número de documento debe ser de caracteres' })
  num_documento: string;

  @IsNotEmpty({ message: 'El género no puede estar vacío' })
  @IsEnum(['MASCULINO', 'FEMENINO'], { message: 'El género debe ser "MASCULINO" o "FEMENINO"' })
  genero: 'MASCULINO' | 'FEMENINO';

  @IsNotEmpty({ message: 'La fecha de nacimiento no puede estar vacía' })
  @IsString({ message: 'La fecha de nacimiento debe ser una cadena de texto' })
  fecha_nacimiento: string;

  @IsNotEmpty({ message: 'El número de celular no puede estar vacío' })
  @IsString({ message: 'El número de celular debe ser de caracteres' })
  celular: string;

  @IsNotEmpty({ message: 'El correo electrónico no puede estar vacío' })
  @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
  @IsEmail({}, { message: 'El correo electrónico debe ser válido' })
  email: string;

  @IsNotEmpty({ message: 'La dirección de domicilio no puede estar vacía' })
  @IsString({ message: 'La dirección de domicilio debe ser una cadena de texto' })
  direccion_domicilio: string;

  @IsNotEmpty({ message: 'El rol no puede estar vacío' })
  @IsEnum(['GERENTE', 'BOLETERO', 'ENCOMENDERO'], { message: 'El rol debe ser "VENDEDOR" o "ADMINISTRADOR"' })
  rol: 'GERENTE' | 'BOLETERO' | 'ENCOMENDERO';

  @IsNotEmpty({ message: 'El id de terminal no puede estar vacío' })
  @IsString({ message: 'El id de terminal debe ser una cadena de texto' })
  terminal_id: string;
}
