import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';

export const generateMockUsers = async (count) => {
  const passwordHash = bcrypt.hashSync('coder123', 10);

  return Array.from({ length: count }, () => ({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: passwordHash,
    role: Math.random() < 0.5 ? 'user' : 'admin',
    pets: [],
  }));
};