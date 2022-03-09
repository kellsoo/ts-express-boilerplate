// 3rd party packages
import supertest from 'supertest';
import { expect } from 'chai';
import { maxBy } from 'lodash';

// Examples data
import { examplesData } from '../../../../../src/utils/test-data';

// Response schema
import { responseSchema } from '../../../../../src/api/v1/example-endpoint/patch.example';

// global variables
const endpoint = (id: any) => `/examples/${id}`;

describe(`[PATCH] ${endpoint(':id')}`, () => {
  let noFoundExampleId: number;
  before(() => {
    const { id } = maxBy(examplesData, (example) => example.id);
    noFoundExampleId = id + 1;
  });

  it('Should response 400 - id must be number', async () => {
    const response = await supertest(require(`${process.cwd()}/src/app`).default).patch(
      endpoint('aaa')
    );
    const { status } = response;
    expect(status).to.eq(400);
  });

  it('Should response 400 - body must contain example field', async () => {
    const response = await supertest(require(`${process.cwd()}/src/app`).default).patch(
      endpoint(noFoundExampleId)
    );
    const { status } = response;

    expect(status).to.eq(400);
  });

  it('Should response 404 - example does not exist', async () => {
    const response = await supertest(require(`${process.cwd()}/src/app`).default)
      .patch(endpoint(10000))
      .send({ example: 'aaa' });
    const { status, body } = response;

    expect(body).to.deep.equal({
      messages: [
        {
          type: 'ERROR',
          message: 'Example not found',
        },
      ],
    });
    expect(status).to.eq(404);
  });

  it('Should response 200', async () => {
    const response = await supertest(require(`${process.cwd()}/src/app`).default)
      .patch(endpoint(1))
      .send({ example: 'aaa' });
    const { status, body } = response;

    expect(status).to.eq(200);
    const validationResult = responseSchema.validate(body);
    expect(validationResult.error).to.eq(undefined);
  });
});
