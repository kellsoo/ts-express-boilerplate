// 3rd party packages
import supertest from 'supertest';
import { expect } from 'chai';
import { maxBy } from 'lodash';

// Examples data
import { examplesData } from '../../../../../src/utils/test-data';

// Response schema
import { responseSchema } from '../../../../../src/api/v1/example-endpoint/get.example';

// global variables
const endpoint = (id: any) => `/examples/${id}`;

describe(`[GET] ${endpoint(':id')}`, () => {
  let noFoundExampleId: number;
  before(() => {
    const { id } = maxBy(examplesData, (example) => example.id);
    noFoundExampleId = id + 1;
  });

  it('Should response 400 - id must be number', async () => {
    const response = await supertest(require(`${process.cwd()}/src/app`).default).get(
      endpoint('aaa')
    );
    const { status, body } = response;
    expect(body).to.deep.equal({
      messages: [
        {
          type: 'ERROR',
          path: 'params.id',
          message: '"params.id" must be a number',
        },
      ],
    });
    expect(status).to.eq(400);
  });

  it('Should response 404 - example does not exist', async () => {
    const response = await supertest(require(`${process.cwd()}/src/app`).default).get(
      endpoint(noFoundExampleId)
    );
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
    const response = await supertest(require(`${process.cwd()}/src/app`).default).get(endpoint(1));
    const { status, body } = response;

    expect(status).to.eq(200);
    const validationResult = responseSchema.validate(body);
    expect(validationResult.error).to.eq(undefined);
  });
});
