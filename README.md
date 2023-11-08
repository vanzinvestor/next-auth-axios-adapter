# next-auth-axios-adapter

`next-auth-axios-adapter` is an authentication adapter for NextAuth.js, which offers complete flexibility to authenticate with any server, allowing you to define fully custom HTTP methods and URL paths using Axios. This adapter provides an extremely versatile way to integrate NextAuth.js into your Next.js application while adapting to your server's unique authentication requirements.

## Features

- Full integration of NextAuth.js with Axios for custom server authentication.
- Define and customize the HTTP methods and URL paths for authentication requests.
- Accommodate a wide range of authentication strategies and server setups.
- Easily configure authentication providers and adapt to any server's APIs.
- Simple and efficient setup for both new and existing Next.js applications.

## Installation

To install `next-auth-axios-adapter`, you can use npm or yarn:

```bash
npm install next-auth-axios-adapter
```

or

```bash
yarn add next-auth-axios-adapter
```

## Usage

Set up NextAuth.js: Configure NextAuth.js in your project with the `next-auth-axios-adapter`. Define your authentication providers, strategies, and callback functions.

```ts
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import AxiosAdapter, { AdapterSettings } from 'next-auth-axios-adapter';
import {
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken as AdapterVerificationToken,
} from 'next-auth/adapters';
import axios, { AxiosResponse } from 'axios';

const settings: AdapterSettings = {
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
  configs: {
    createUser(user) {
      return {
        method: 'POST',
        path: '/users',
        sendBody: user,
        selectedData: (res: AxiosResponse<{ user: AdapterUser }, any>) =>
          res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    getUser(id) {
      return {
        method: 'GET',
        path: `/users/${id}`,
        selectedData: (res: AxiosResponse<{ user: AdapterUser }, any>) =>
          res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    getUserByEmail(email) {
      return {
        method: 'POST',
        path: `/users/email`,
        sendBody: { email: email }, // optional
        selectedData: (res: AxiosResponse<{ user: AdapterUser }, any>) =>
          res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    getUserByAccount(data) {
      return {
        method: 'POST',
        path: `/users/account`,
        sendBody: data,
        selectedData: (res: AxiosResponse<{ user: AdapterUser }, any>) =>
          res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    updateUser(data) {
      return {
        method: 'PUT',
        path: `/users/${data.id}`,
        sendBody: data,
        selectedData: (res: AxiosResponse<{ user: AdapterUser }, any>) =>
          res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    deleteUser(id) {
      return {
        method: 'DELETE',
        path: `/users/${id}`,
        selectedData: (res: AxiosResponse<{ user: AdapterUser }, any>) =>
          res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    linkAccount(data) {
      return {
        method: 'POST',
        path: `/accounts`,
        sendBody: data,
        selectedData: (res: AxiosResponse<{ account: AdapterAccount }, any>) =>
          res.data.account,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    unlinkAccount(data) {
      return {
        method: 'PUT',
        path: `/accounts/delete`,
        sendBody: data,
        selectedData: (res: AxiosResponse<{ account: AdapterAccount }, any>) =>
          res.data.account,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    getSessionAndUser(sessionToken) {
      return {
        method: 'GET',
        path: `/sessions/session-tokens/${sessionToken}`,
        selectedData: (
          res: AxiosResponse<
            { user: AdapterUser; session: AdapterSession },
            any
          >
        ) => ({
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
        selectedData: (res: AxiosResponse<{ session: AdapterSession }, any>) =>
          res.data.session,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    updateSession(data) {
      return {
        method: 'PUT',
        path: `/sessions/session-tokens/${data.sessionToken}`,
        sendBody: data,
        selectedData: (res: AxiosResponse<{ session: AdapterSession }, any>) =>
          res.data.session,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    deleteSession(sessionToken) {
      return {
        method: 'DELETE',
        path: `/sessions/session-tokens/${sessionToken}`,
        selectedData: (res: AxiosResponse<{ session: AdapterSession }, any>) =>
          res.data.session,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    createVerificationToken(data) {
      return {
        method: 'POST',
        path: `/verification-tokens`,
        sendBody: data,
        selectedData: (
          res: AxiosResponse<
            { verificationToken: AdapterVerificationToken },
            any
          >
        ) => res.data.verificationToken,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
    useVerificationToken(data) {
      return {
        method: 'PUT',
        path: `/verification-tokens/identifier`,
        sendBody: data,
        selectedData: (
          res: AxiosResponse<
            { verificationToken: AdapterVerificationToken },
            any
          >
        ) => res.data.verificationToken,
        isMongoDb: true, // optional (Auto convert _id to id)
      };
    },
  },
};

const handler = NextAuth({
  // ...
  adapter: AxiosAdapter(axios, settings),
  // ...
});

export { handler as GET, handler as POST };
```

## Use AxiosInstance

```ts
// ...
import axios, { AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    // Authorization: `Bearer ${process.env.SERVER_API_KEY}`,
    'Content-Type': 'application/json',
  },
  // timeout: 10000,
});

const settings: AdapterSettings = {
  baseUrl: `/api`, // Set baseURL in AxiosInstance
  configs: {
    // ...
  },
};

const handler = NextAuth({
  // ...
  adapter: AxiosAdapter(axiosInstance, settings),
  // ...
});

export { handler as GET, handler as POST };
```

## Configs Method

```ts
// ...
const settings: AdapterSettings = {
  // ...
  configs: {
    // ...
    // Example createUser
    createUser(user) {
      return {
        method: 'POST', // GET POST PUT PATCH DELETE
        path: '/users',
        sendBody: user, // send body support POST PUT PATCH
        selectedData: (res: AxiosResponse<{ user: AdapterUser }, any>) =>
          res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
        requestConfig: { headers: { 'Content-Type': 'application/json' } }, // optional
      };
    },
    // ...
    // Example getUserByEmail
    getUserByEmail(email) {
      return {
        method: 'GET', // GET POST PUT PATCH DELETE
        path: `/users/email/${encodeURIComponent(email)}`,
        selectedData: (res: AxiosResponse<{ user: AdapterUser }, any>) =>
          res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
        requestConfig: { headers: { 'Content-Type': 'application/json' } }, // optional
      };
    },
    // ...
    // Example updateUser
    updateUser(data) {
      return {
        method: 'PUT', // GET POST PUT PATCH DELETE
        path: `/users/${data.id}`,
        sendBody: data, // send body support POST PUT PATCH and If isMongoDb: true (Auto convert id to _id)
        selectedData: (res: AxiosResponse<{ user: AdapterUser }, any>) =>
          res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
        requestConfig: { headers: { 'Content-Type': 'application/json' } }, // optional
      };
    },
    // ...
    // Example deleteUser
    deleteUser(id) {
      return {
        method: 'DELETE', // GET POST PUT PATCH DELETE
        path: `/users/${id}`,
        selectedData: (res: AxiosResponse<{ user: AdapterUser }, any>) =>
          res.data.user,
        isMongoDb: true, // optional (Auto convert _id to id)
        requestConfig: { headers: { 'Content-Type': 'application/json' } }, // optional
      };
    },
    // ...
  },
};
// ...
```

## Credits and Thanks to inspire me

[Auth.js: Creating a database adapter](https://authjs.dev/guides/adapters/creating-a-database-adapter)
[@auth/mongodb-adapter](https://www.npmjs.com/package/@auth/mongodb-adapter)
