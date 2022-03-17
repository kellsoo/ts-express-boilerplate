// 3rd party packages
import supertest from 'supertest';
import { expect } from 'chai';

// Response schema
import { responseSchema } from '../../../../../src/api/v1/authorization/post.login';

// express app
import app from '../../../../../src/app';

// global variables
const endpoint = '/auth/login';

describe(`[POST] ${endpoint}`, () => {
  it('Should response 400 - no email and password in body', async () => {
    const response = await supertest(app).post(endpoint);
    expect(response.status).to.eq(400);
  });

  it('Should response 401 - wrong credentials', async () => {
    const response = await supertest(app).post(endpoint).send({ email: 'foo@bar.com', password: 'bar' });

    const { status, body } = response;

    expect(status).to.eq(401);
    expect(body).to.deep.equal({ messages: [{ type: 'ERROR', message: 'Wrong credentials' }] });
  });

  it('Should response 200', async () => {
    const response = await supertest(app).post(endpoint).send({ email: 'test@user.sk', password: 'Ab12345*' });

    const { status, body } = response;

    expect(status).to.eq(200);

    const validationResult = responseSchema.validate(body);
    expect(validationResult.error).to.eq(undefined);
  });
});
