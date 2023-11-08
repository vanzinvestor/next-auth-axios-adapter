import {
  AdapterUser,
  AdapterAccount,
  AdapterSession,
  VerificationToken as AdapterVerificationToken,
} from 'next-auth/adapters';
import { _id } from '../src/utils';

export const idString = '63bab398c9a5b6b0a84c2698';
export const idStringIncorrect = '63bab398c9a5b6b0a84c2698no';
export const userIdString = idString;
export const sessionToken = '456d719f-3a1d-42aa-afc3-e40147596165';
export const token = '6fea50c9-a1ff-4b65-a033-735feb40e169';
export const identifier = '1b3451dc-b3ed-4b8c-9106-b20cd6809af4';
export const roleIdString = '652cb2ffb06e80f7a5a3bfc4';

export const user: { create: AdapterUser; update: AdapterUser } = {
  create: {
    id: _id(idString).toHexString(),
    name: 'test',
    email: 'test@test.com',
    emailVerified: new Date(),
    image: 'https://placehold.co/600x400?text=test',
  },
  update: {
    id: _id(idString).toHexString(),
    name: 'update',
    email: 'update@test.com',
    emailVerified: new Date(),
    image: 'https://placehold.co/600x400?text=test',
  },
};

export const account: { create: AdapterAccount; update: AdapterAccount } = {
  create: {
    id: _id(idString).toHexString(),
    userId: _id(userIdString).toHexString(),
    type: 'oauth',
    provider: 'google',
    providerAccountId: 'provider-account-id',
    access_token: 'access-token',
    expires_at: 1697439324,
    token_type: 'Bearer',
    scope: 'openid',
    id_token: 'id-token',
  },
  update: {
    id: _id(idString).toHexString(),
    userId: _id(userIdString).toHexString(),
    type: 'oauth',
    provider: 'new-google',
    providerAccountId: 'provider-account-id',
    access_token: 'access-token',
    expires_at: 1697439324,
    token_type: 'Bearer',
    scope: 'openid',
    id_token: 'id-token',
  },
};

export const session: { create: AdapterSession; update: AdapterSession } = {
  create: {
    userId: _id(userIdString).toHexString(),
    sessionToken: sessionToken,
    expires: new Date(),
  },
  update: {
    userId: _id(userIdString).toHexString(),
    sessionToken: sessionToken,
    expires: new Date(Date.now() + 60 * 60 * 1000),
  },
};

export const verificationToken: { create: AdapterVerificationToken } = {
  create: {
    token: token,
    identifier: identifier,
    expires: new Date(),
  },
};

export const userMongo = {
  _id: _id(idString),
  name: 'test',
  email: 'test@test.com',
  emailVerified: new Date('2023-10-20').toISOString(),
  image: 'https://placehold.co/600x400?text=test',
  roleId: _id(roleIdString),
};

export const userMongoString = {
  _id: idString,
  name: 'test',
  email: 'test@test.com',
  emailVerified: new Date('2023-10-20').toISOString(),
  image: 'https://placehold.co/600x400?text=test',
  roleId: roleIdString,
};

export const userJs = {
  id: _id(idString).toHexString(),
  name: 'test',
  email: 'test@test.com',
  emailVerified: new Date('2023-10-20').toISOString(),
  image: 'https://placehold.co/600x400?text=test',
  roleId: _id(roleIdString).toHexString(),
};

export const accountMongo = {
  _id: _id(idString),
  userId: _id(userIdString),
  type: 'oauth',
  provider: 'google',
  providerAccountId: 'provider-account-id',
  access_token: 'access-token',
  expires_at: 1697439324,
  token_type: 'Bearer',
  scope: 'openid',
  id_token: 'id-token',
};

export const accountJs = {
  id: _id(idString).toHexString(),
  userId: _id(userIdString).toHexString(),
  type: 'oauth',
  provider: 'google',
  providerAccountId: 'provider-account-id',
  access_token: 'access-token',
  expires_at: 1697439324,
  token_type: 'Bearer',
  scope: 'openid',
  id_token: 'id-token',
};

export const sessionMongo = {
  _id: _id(idString),
  userId: _id(userIdString),
  sessionToken: sessionToken,
  expires: new Date('2023-10-20').toISOString(),
};

export const sessionJs = {
  id: _id(idString).toHexString(),
  userId: _id(userIdString).toHexString(),
  sessionToken: sessionToken,
  expires: new Date('2023-10-20').toISOString(),
};

export const verificationTokenMongo = {
  _id: _id(idString),
  token: token,
  identifier: identifier,
  expires: new Date('2023-10-20').toISOString(),
};

export const verificationTokenJs = {
  id: _id(idString).toHexString(),
  token: token,
  identifier: identifier,
  expires: new Date('2023-10-20').toISOString(),
};

export const mockTestMongo = {
  _id: _id(idString),
  userId: _id(userIdString),
  roleId: _id(roleIdString),
  data: ['ABC'],
};

export const mockTestjs = {
  id: _id(idString).toHexString(),
  userId: _id(userIdString).toHexString(),
  roleId: _id(roleIdString).toHexString(),
  data: ['ABC'],
};

export const mockTestMongoString = {
  _id: _id(idString).toHexString(),
  userId: _id(userIdString).toHexString(),
  roleId: _id(roleIdString).toHexString(),
  abcId: 4567823,
  data: ['ABC'],
};

export const mockTestJsString = {
  id: _id(idString).toHexString(),
  userId: _id(userIdString).toHexString(),
  roleId: _id(roleIdString).toHexString(),
  abcId: 4567823,
  data: ['ABC'],
};

export const mockTestJsObjectId = {
  id: _id(idString),
  userId: _id(userIdString),
  roleId: _id(roleIdString),
  abcId: 4567823,
  data: ['ABC'],
};
