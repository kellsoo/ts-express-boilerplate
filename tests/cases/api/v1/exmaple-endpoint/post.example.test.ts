// 3rd party packages
import supertest from 'supertest';
import { expect } from 'chai';
import { minBy, maxBy } from 'lodash';

// express app
import app from '../../../../../src/app';

// Response schema
import { responseSchema } from '../../../../../src/api/v1/example-endpoint/post.example';

// global variables
const endpoint = '/examples';

describe(`[POST] ${endpoint}`, () => {
  it('Should response 400 - example field in body is required', async () => {
    const response = await supertest(app).post(endpoint);
    const { status } = response;
    expect(status).to.eq(400);
  });

  it('Should response 400 - example field must contain at 3 char at least', async () => {
    const response = await await supertest(app).post(endpoint).send({
      example: 'aa',
    });
    const { status } = response;
    expect(status).to.eq(400);
  });

  it('Should response 200 - example created', async () => {
    const response = await await supertest(app).post(endpoint).send({
      example: 'aaa',
    });
    const { status, body } = response;

    expect(status).to.eq(200);
    const validationResult = responseSchema.validate(body);
    expect(validationResult.error).to.eq(undefined);
  });
});
