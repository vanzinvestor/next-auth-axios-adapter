import assert from 'assert';
import axios from 'axios';
import { AxiosAdapter, AdapterSettings } from '../src';
import {
  account,
  roleIdString,
  session,
  user,
  verificationToken,
} from './test.data';

const settings: AdapterSettings = {
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
  configs: {
    createUser(user) {
      return {
        method: 'POST',
        path: '/users',
        sendBody: user,
        selectedData: (res) => res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    getUser(id) {
      return {
        method: 'GET',
        path: `/users/${id}`,
        selectedData: (res) => res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    getUserByEmail(email) {
      return {
        method: 'POST',
        path: `/users/email`,
        sendBody: { email: email },
        selectedData: (res) => res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    getUserByAccount(data) {
      return {
        method: 'POST',
        path: `/users/account`,
        sendBody: data,
        selectedData: (res) => res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    updateUser(data) {
      return {
        method: 'PUT',
        path: `/users/${data.id}`,
        sendBody: data, // isMongoDb: true (Auto convert id to _id)
        selectedData: (res) => res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    deleteUser(id) {
      return {
        method: 'DELETE',
        path: `/users/${id}`,
        selectedData: (res) => res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    linkAccount(data) {
      return {
        method: 'POST',
        path: `/accounts`,
        sendBody: data,
        selectedData: (res) => res.data.account,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    unlinkAccount(data) {
      return {
        method: 'PUT',
        path: `/accounts/delete`,
        sendBody: data,
        selectedData: (res) => res.data.account,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    getSessionAndUser(sessionToken) {
      return {
        method: 'GET',
        path: `/sessions/session-tokens/${sessionToken}`,
        selectedData: (res) => ({
          user: res.data.user,
          session: res.data.session,
        }),
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    createSession(data) {
      return {
        method: 'POST',
        path: `/sessions`,
        sendBody: data,
        selectedData: (res) => res.data.session,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    updateSession(data) {
      return {
        method: 'PUT',
        path: `/sessions/session-tokens/${data.sessionToken}`,
        sendBody: data,
        selectedData: (res) => res.data.session,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    deleteSession(sessionToken) {
      return {
        method: 'DELETE',
        path: `/sessions/session-tokens/${sessionToken}`,
        selectedData: (res) => res.data.session,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    createVerificationToken(data) {
      return {
        method: 'POST',
        path: `/verification-tokens`,
        sendBody: data,
        selectedData: (res) => res.data.verificationToken,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    useVerificationToken(data) {
      return {
        method: 'PUT',
        path: `/verification-tokens/identifier`,
        sendBody: data,
        selectedData: (res) => res.data.verificationToken,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
  },
};

describe('Index tests', function () {
  const adapter = AxiosAdapter(axios, settings);

  it('Test Adapter want to implement createUser', async function () {
    assert.equal(true, typeof adapter.createUser === 'function');
  });

  it('Test Adapter want to implement getUser', async function () {
    assert.equal(true, typeof adapter.getUser === 'function');
  });

  it('Test Adapter want to implement getUserByEmail', async function () {
    assert.equal(true, typeof adapter.getUserByEmail === 'function');
  });

  it('Test Adapter want to implement getUserByAccount', async function () {
    assert.equal(true, typeof adapter.getUserByAccount === 'function');
  });

  it('Test Adapter want to implement updateUser', async function () {
    assert.equal(true, typeof adapter.updateUser === 'function');
  });

  it('Test Adapter want to implement deleteUser', async function () {
    assert.equal(true, typeof adapter.deleteUser === 'function');
  });

  it('Test Adapter want to implement linkAccount', async function () {
    assert.equal(true, typeof adapter.linkAccount === 'function');
  });

  it('Test Adapter want to implement unlinkAccount', async function () {
    assert.equal(true, typeof adapter.unlinkAccount === 'function');
  });

  it('Test Adapter want to implement getSessionAndUser', async function () {
    assert.equal(true, typeof adapter.getSessionAndUser === 'function');
  });

  it('Test Adapter want to implement createSession', async function () {
    assert.equal(true, typeof adapter.createSession === 'function');
  });

  it('Test Adapter want to implement updateSession', async function () {
    assert.equal(true, typeof adapter.updateSession === 'function');
  });

  it('Test Adapter want to implement deleteSession', async function () {
    assert.equal(true, typeof adapter.deleteSession === 'function');
  });

  it('Test Adapter want to implement createVerificationToken', async function () {
    assert.equal(true, typeof adapter.createVerificationToken === 'function');
  });

  it('Test Adapter want to implement useVerificationToken', async function () {
    assert.equal(true, typeof adapter.useVerificationToken === 'function');
  });

  // it('Test createUser', async function () {
  //   if (adapter.createUser) {
  //     const res = await adapter.createUser(user.create);
  //     assert.equal(res.email, user.create.email);
  //   }
  // });

  // it('Test getUser', async function () {
  //   if (adapter.getUser) {
  //     const res = await adapter.getUser(user.create.id);
  //     assert.equal(res?.email, user.create.email);
  //   }
  // });

  // it('Test getUser but user not found', async function () {
  //   if (adapter.getUser) {
  //     const res = await adapter.getUser(roleIdString);
  //     assert.equal(res, null);
  //   }
  // });

  // it('Test getUserByEmail', async function () {
  //   if (adapter.getUserByEmail) {
  //     const res = await adapter.getUserByEmail(user.create.email);
  //     assert.equal(res?.email, user.create.email);
  //   }
  // });

  // it('Test getUserByEmail but user not found', async function () {
  //   if (adapter.getUserByEmail) {
  //     const res = await adapter.getUserByEmail(user.update.email);
  //     assert.equal(res, null);
  //   }
  // });

  // it('Test updateUser', async function () {
  //   if (adapter.updateUser) {
  //     const res = await adapter.updateUser(user.update);
  //     assert.equal(res.email, user.update.email);
  //   }
  // });

  // it('Test linkAccount', async function () {
  //   if (adapter.linkAccount) {
  //     const res = await adapter.linkAccount(account.create);
  //     assert.equal(res?.provider, account.create.provider);
  //   }
  // });

  // it('Test createSession', async function () {
  //   if (adapter.createSession) {
  //     const res = await adapter.createSession(session.create);
  //     assert.equal(res?.userId, user.create.id);
  //   }
  // });

  // it('Test getSessionAndUser', async function () {
  //   if (adapter.getSessionAndUser) {
  //     const res = await adapter.getSessionAndUser(session.create.sessionToken);
  //     assert.equal(res?.user.email, user.update.email);
  //   }
  // });

  // it('Test updateSession', async function () {
  //   if (adapter.updateSession) {
  //     const res = await adapter.updateSession(session.update);
  //     assert.equal(new Date(res?.expires!) > new Date(), true);
  //   }
  // });

  // it('Test createVerificationToken', async function () {
  //   if (adapter.createVerificationToken) {
  //     const res = await adapter.createVerificationToken(
  //       verificationToken.create
  //     );
  //     assert.equal(res?.token, verificationToken.create.token);
  //   }
  // });

  // it('Test useVerificationToken', async function () {
  //   if (adapter.useVerificationToken) {
  //     const res = await adapter.useVerificationToken({
  //       token: verificationToken.create.token,
  //       identifier: verificationToken.create.identifier,
  //     });
  //     assert.equal(res?.token, verificationToken.create.token);
  //   }
  // });

  // // Delete data
  // it('Test deleteSession', async function () {
  //   if (adapter.deleteSession) {
  //     const res = await adapter.deleteSession(session.create.sessionToken);

  //     assert.equal(res?.sessionToken, session.create.sessionToken);
  //   }
  // });

  // it('Test unlinkAccount', async function () {
  //   if (adapter.unlinkAccount) {
  //     const res = await adapter.unlinkAccount({
  //       provider: account.create.provider,
  //       providerAccountId: account.create.providerAccountId,
  //     });
  //   }
  // });

  // // Delete user needs at the end of the test list
  // it('Test deleteUser', async function () {
  //   if (adapter.deleteUser) {
  //     const res = await adapter.deleteUser(user.create.id);
  //     assert.equal(res, res);
  //   }
  // });
});
