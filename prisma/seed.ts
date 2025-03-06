import { PaymentType, PrismaClient, RoleType } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { BcryptUtil } from '../src/util/bcrypt.util';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding DATABASE SEED...');

  // Insertar roles por defecto
  const roles = [
    { role_id: 1, name: 'admin' as RoleType },
    { role_id: 2, name: 'client' as RoleType },
  ];
  await prisma.role.createMany({ data: roles, skipDuplicates: true });

  // Insertar métodos de pago por defecto
  const paymentMethods = [
    { payment_method_id: 1, name: 'bank_transfer' as PaymentType },
    { payment_method_id: 2, name: 'cash' as PaymentType },
    { payment_method_id: 3, name: 'credit_card' as PaymentType },
    { payment_method_id: 4, name: 'crypto' as PaymentType },
    { payment_method_id: 5, name: 'paypal' as PaymentType },
  ];
  await prisma.paymentMethod.createMany({
    data: paymentMethods,
    skipDuplicates: true,
  });

  // Limpiando tablas de la base de datos
  await prisma.$transaction([
    prisma.user.deleteMany(),
    prisma.plan.deleteMany(),
    prisma.service.deleteMany(),
  ]);

  // Encriptando la contraseña
  const hashPassword = await BcryptUtil.hashPassword('12345678');

  // Generando 10 usuarios ficticios
  const users = Array.from({ length: 10 }).map(() => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      first_name: firstName,
      last_name: lastName,
      email: `${firstName}.${lastName}@gmail.com`.toLowerCase(),
      password: hashPassword,
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      balance: faker.number.float({ min: 0, max: 1000, fractionDigits: 2 }),
      role_id: faker.helpers.arrayElement([1, 2]), // Asigna un rol aleatorio
    };
  });
  await prisma.user.createMany({ data: users });

  // Generar 5 planes ficticios
  const plans = Array.from({ length: 5 }).map(() => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.float({ min: 10, max: 100, fractionDigits: 2 }),
    billing_cycle: faker.helpers.arrayElement(['monthly', 'yearly']),
  }));
  await prisma.plan.createMany({ data: plans });

  // Generar 10 servicios ficticios
  const services = Array.from({ length: 10 }).map(() => ({
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: faker.number.float({ min: 5, max: 500, fractionDigits: 2 }),
  }));
  await prisma.service.createMany({ data: services });

  console.log('Seeding COMPLETED SEED!');
}

main()
  .catch((e) => {
    console.log('ERROR Seeding');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
