import { PrismaClient, EstadoEmpresa, Ciudades, RolEmpleados, TiposDocumento, Generos, Estados } from '@prisma/client';

import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.empresa.create({
    data: {
      nombre_comercial: 'El Apurimeño',
      razon_social: 'El apurimeño S.A.',
      ruc: '12345678901',
      direccion: 'Av. las fresias 123',
      departamento: 'Apurimac',
      provincia: 'Andahauylas',
      distrito: 'Andahuaylas',
      telefono: '987654321',
      email: 'elapu@gmail.com',
      sitio_web: 'https://elapurimeño.com',
      tipo_empresa: 'Transporte',
      licencia_mtc: 'MT12345',
      fecha_licencia: new Date('2022-01-01'),
      estado: EstadoEmpresa.ACTIVO,
      fecha_fundacion: new Date('2000-01-01'),
      logo_url: 'https://res.cloudinary.com/ddqdwtsn6/image/upload/v1732600023/transportes/Portada_ykx5iz.jpg',
    },
  });

  await prisma.ubicacionTerminal.create({
    data: {
      ciudad: Ciudades.Andahuaylas,
    },
  });

  const terminal = await prisma.ubicacionTerminal.findFirst();

  await prisma.empleados.create({
    data: {
      nombres: 'admin',
      apellidos: 'admin',
      tipo_documento: TiposDocumento.DNI,
      num_documento: '12345678',
      genero: Generos.MASCULINO,
      fecha_nacimiento: new Date('2004-02-28'),
      celular: '999123456',
      email: 'admin@gmail.com',
      direccion_domicilio: 'Jr. las fresias S/N',
      estado: Estados.ACTIVO,
      rol: RolEmpleados.GERENTE,
      terminal_id: terminal ? terminal.id : '',
    },
  });

  const user = await prisma.empleados.findFirst();

  await prisma.credenciales.create({
    data: {
      clave: await bcrypt.hash(user.num_documento, 10),
      usuario: user.num_documento,
      empleado_id: user.id,
    },
  });

  console.log('Seeding completed!');
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
