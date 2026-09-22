import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const adapter = new PrismaMariaDb({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.appointment.create({
    data: {
      id_locador: 1,
      id_locatario: 1,
      id_imovel: 1,
      data: new Date('2026-09-10T14:00:00'),
      tipo: 'Visita ao imóvel',
      status: 'SCHEDULED',
    },
  });

  await prisma.appointment.create({
    data: {
      id_locador: 2,
      id_locatario: 2,
      id_imovel: 3,
      data: new Date('2026-08-20T10:30:00'),
      tipo: 'Visita ao imóvel',
      status: 'COMPLETED',
    },
  });

  await prisma.appointment.create({
    data: {
      id_locador: 4,
      id_locatario: 3,
      id_imovel: 4,
      data: new Date('2026-08-25T09:00:00'),
      tipo: 'Visita ao imóvel',
      status: 'CANCELED',
    },
  });

  // Compromisso genérico sem locador/locatário/imóvel vinculado (ex: reunião interna)
  await prisma.appointment.create({
    data: {
      data: new Date('2026-09-05T08:00:00'),
      tipo: 'Reunião interna da equipe',
      status: 'SCHEDULED',
    },
  });

  console.log('Seed concluído: api-agendamento-visitas');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
