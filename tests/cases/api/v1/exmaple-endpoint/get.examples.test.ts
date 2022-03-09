// 3rd party packages
import supertest from 'supertest';
import { expect } from 'chai';
import { minBy, maxBy } from 'lodash';

// Response schema
import { responseSchema } from '../../../../../src/api/v1/example-endpoint/get.examples';

// global variables
const endpoint = '/examples';

describe(`[GET] ${endpoint}`, () => {
  it('Should response 200 - ids from 1 to 25 id ', async () => {
    const response = await supertest(require(`${process.cwd()}/src/app`).default).get(endpoint);
    const { status, body } = response;
    const { examples } = body;

    const { id: minId } = minBy(examples, (example) => example.id);
    const { id: maxId } = maxBy(examples, (example) => example.id);

    const validationResult = responseSchema.validate(body);
    expect(validationResult.error).to.eq(undefined);
    expect(minId).to.eq(1);
    expect(maxId).to.eq(25);
  });

  it('Should response 200 - ids from 26 to 50 ', async () => {
    const response = await supertest(require(`${process.cwd()}/src/app`).default)
      .get(endpoint)
      .query({ page: 2 });
    const { status, body } = response;
    const { examples } = body;

    const { id: minId } = minBy(examples, (example) => example.id);
    const { id: maxId } = maxBy(examples, (example) => example.id);

    const validationResult = responseSchema.validate(body);
    expect(validationResult.error).to.eq(undefined);
    expect(minId).to.eq(26);
    expect(maxId).to.eq(50);
  });
});
