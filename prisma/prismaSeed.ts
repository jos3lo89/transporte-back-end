// import {
//   PrismaClient,
//   EstadoEmpresa,
//   Ciudades,
//   RolEmpleados,
//   TiposDocumento,
//   Generos,
//   Estados,
//   TiposServicio,
//   Conbustibles,
//   TipoEncomienda,
// } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   // Semilla para Empresa
//   await prisma.empresa.create({
//     data: {
//       nombre_comercial: 'El Apurimeño',
//       razon_social: 'El apurimeño S.A.',
//       ruc: '12345678901',
//       direccion: 'Av. las fresias 123',
//       departamento: 'Apurimac',
//       provincia: 'Andahauylas',
//       distrito: 'Andahuaylas',
//       telefono: '987654321',
//       email: 'elapu@gmail.com',
//       sitio_web: 'https://elapurimeño.com',
//       tipo_empresa: 'Transporte',
//       licencia_mtc: 'MT12345',
//       fecha_licencia: new Date('2022-01-01'),
//       estado: EstadoEmpresa.ACTIVO,
//       fecha_fundacion: new Date('2000-01-01'),
//       logo_url: 'https://res.cloudinary.com/ddqdwtsn6/image/upload/v1732600023/transportes/Portada_ykx5iz.jpg',
//     },
//   });

//   // Semilla para UbicacionTerminal
//   await prisma.ubicacionTerminal.create({
//     data: {
//       ciudad: Ciudades.Andahuaylas,
//     },
//   });

//   // Semilla para Empleados
//   const terminal = await prisma.ubicacionTerminal.findFirst(); // Asume que tienes al menos un terminal
//   await prisma.empleados.create({
//     data: {
//       nombres: 'Jose Luis',
//       apellidos: 'Galindo Cardenas',
//       tipo_documento: TiposDocumento.DNI,
//       num_documento: '74843111',
//       genero: Generos.MASCULINO,
//       fecha_nacimiento: new Date('2001-01-18'),
//       celular: 916099300,
//       email: 'pma.mode.18@gmail.com',
//       direccion_domicilio: 'Jr. Tadeo leguis S/N',
//       estado: Estados.ACTIVO,
//       rol: RolEmpleados.GERENTE,
//       terminal_id: terminal ? terminal.id : '',
//     },
//   });

//   // Semilla para Conductores
//   // await prisma.conductores.create({
//   //   data: {
//   //     nombres: 'Carlos',
//   //     apellidos: 'Gomez',
//   //     tipo_documento: TiposDocumento.DNI,
//   //     num_documento: '456789123',
//   //     genero: Generos.MASCULINO,
//   //     fecha_nacimiento: new Date('1985-04-22'),
//   //     celular: '912345678',
//   //     email: 'carlos.gomez@example.com',
//   //     direccion_domicilio: 'Av. Conductor 789',
//   //     licencia: 'LIC123456',
//   //     estado: Estados.ACTIVO,
//   //   },
//   // });

//   // Semilla para Vehiculos
//   const conductor = await prisma.conductores.findFirst(); // Asume que tienes al menos un conductor
//   await prisma.vehiculos.create({
//     data: {
//       tarjeta_de_circulacion: 'TC123456',
//       numero_de_placa: 'ABC-123',
//       marca: 'Toyota',
//       modelo: 'Corolla',
//       annio_de_fabricacion: 2015,
//       tipo_combustible: Conbustibles.GASOLINA,
//       color: 'Negro',
//       numero_motor: 'NM123456',
//       cantidad_ruedas: 4,
//       total_asientos: 4,
//       total_pasajeros: 4,
//       peso_seco: 1200,
//       peso_bruto: 1500,
//       tipo_servicio: TiposServicio.TRANSPORTE_MIXTO,
//       estado: Estados.ACTIVO,
//       conductor_id: conductor ? conductor.id : '',
//     },
//   });

//   // Semilla para Rutas
//   const terminalDestino = await prisma.ubicacionTerminal.findFirst({ where: { ciudad: Ciudades.Ayacucho } });
//   const terminalOrigen = await prisma.ubicacionTerminal.findFirst({ where: { ciudad: Ciudades.Andahuaylas } });
//   if (terminalOrigen && terminalDestino) {
//     await prisma.rutas.create({
//       data: {
//         duracion: 120,
//         distancia_km: 150.75,
//         origen_id: terminalOrigen.id,
//         destino_id: terminalDestino.id,
//       },
//     });
//   }

//   // Semilla para Viajes
//   const ruta = await prisma.rutas.findFirst();
//   const vehiculo = await prisma.vehiculos.findFirst();
//   if (ruta && vehiculo && conductor) {
//     await prisma.viajes.create({
//       data: {
//         fecha: new Date('2024-11-10'),
//         precio: 100,
//         ruta_id: ruta.id,
//         vehiculo_id: vehiculo.id,
//         conductor_id: conductor.id,
//       },
//     });
//   }

//   // Semilla para Pasajeros
//   const viaje = await prisma.viajes.findFirst();
//   if (viaje) {
//     await prisma.pasajeros.create({
//       data: {
//         nombres: 'Pedro',
//         apellidos: 'Lopez',
//         tipo_documento: TiposDocumento.DNI,
//         num_documento: '12345678',
//         destino: Ciudades.Ayacucho,
//         num_asiento: 1,
//         viaje_id: viaje.id,
//       },
//     });
//   }

//   console.log('Seeding completed!');
// }

// main()
//   .then(() => prisma.$disconnect())
//   .catch((e) => {
//     console.error(e);
//     prisma.$disconnect();
//     process.exit(1);
//   });
