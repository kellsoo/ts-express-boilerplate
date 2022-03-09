// 3rd party packages
import { faker } from '@faker-js/faker';

const examplesData: any = [];
for (let id = 1; id < 101; id++)
  examplesData.push({
    id,
    example: faker.animal.type(),
  });

export { examplesData };
