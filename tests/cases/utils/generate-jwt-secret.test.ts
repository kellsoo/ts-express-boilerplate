// 3rd party packages
import { expect } from 'chai';

// utils functions
import { generateJwtSecret } from '../../../src/utils/generate-jwt-secret';

describe('Utils', () => {
  it('should response jwt token 64 char length', () => {
    const response = generateJwtSecret();

    expect(response).to.be.a('string');
    expect(response.length).to.eq(64);
  });
});
