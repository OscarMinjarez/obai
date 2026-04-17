import { JwtStrategy } from './jwt';

jest.mock('jwks-rsa', () => ({
  passportJwtSecret: jest.fn().mockReturnValue(jest.fn()),
}));

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    process.env.SUPABASE_JWT_SECRET = 'test-secret';
    strategy = new JwtStrategy();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should validate and return user object from payload', async () => {
    const payload = { sub: 'user-123', email: 'test@obai.com' };
    const result = await strategy.validate(payload);
    expect(result).toEqual({ id: 'user-123', email: 'test@obai.com' });
  });
});
