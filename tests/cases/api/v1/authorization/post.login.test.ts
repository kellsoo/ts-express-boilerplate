// 3rd party packages
import supertest from 'supertest';
import { expect } from 'chai';

// Response schema
// import { responseSchema } from '../../../../src/api/v1/authorization/post.login';

// express app
import app from '../../../../../src/app';

// global variables
const endpoint = '/auth/login';

describe(`[POST] ${endpoint}`, () => {
  it('Should response 400 - no email and password in body', async () => {
    const response = await supertest(app).post(endpoint);
    expect(response.status).to.eq(400);
  });
});
