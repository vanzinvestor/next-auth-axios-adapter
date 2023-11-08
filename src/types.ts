import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken as AdapterVerificationToken,
} from 'next-auth/adapters';

export type HttpMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export type ConfigRequestToApiServer<TB, TD> = {
  method: HttpMethods;
  path: string;
  sendBody?: TB;
  selectedData: (res: AxiosResponse<any, any>) => TD;
  isMongoDb?: boolean;
  requestConfig?: AxiosRequestConfig<any>;
};

export type AdapterSettings = {
  baseUrl: string;
  configs: {
    createUser(
      user: Omit<AdapterUser, 'id'>
    ): ConfigRequestToApiServer<Omit<AdapterUser, 'id'>, AdapterUser>;
    getUser(id: string): ConfigRequestToApiServer<{ id: string }, AdapterUser>;
    getUserByEmail(
      email: string
    ): ConfigRequestToApiServer<{ email: string }, AdapterUser>;
    getUserByAccount(
      data: Pick<AdapterAccount, 'providerAccountId' | 'provider'>
    ): ConfigRequestToApiServer<
      Pick<AdapterAccount, 'providerAccountId' | 'provider'>,
      AdapterUser
    >;
    updateUser(
      data: Partial<AdapterUser> & Pick<AdapterUser, 'id'>
    ): ConfigRequestToApiServer<
      Partial<AdapterUser> & Pick<AdapterUser, 'id'>,
      AdapterUser
    >;
    deleteUser(
      id: string
    ): ConfigRequestToApiServer<{ id: string }, AdapterUser>;
    linkAccount(
      data: AdapterAccount
    ): ConfigRequestToApiServer<AdapterAccount, AdapterAccount>;
    unlinkAccount(
      data: Pick<AdapterAccount, 'providerAccountId' | 'provider'>
    ): ConfigRequestToApiServer<
      Pick<AdapterAccount, 'providerAccountId' | 'provider'>,
      AdapterAccount
    >;
    getSessionAndUser(
      sessionToken: string
    ): ConfigRequestToApiServer<
      { sessionToken: string },
      { user: AdapterUser; session: AdapterSession }
    >;
    createSession(
      data: AdapterSession
    ): ConfigRequestToApiServer<AdapterSession, AdapterSession>;
    updateSession(
      data: Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>
    ): ConfigRequestToApiServer<
      Partial<AdapterSession> & Pick<AdapterSession, 'sessionToken'>,
      AdapterSession
    >;
    deleteSession(
      sessionToken: string
    ): ConfigRequestToApiServer<{ sessionToken: string }, AdapterSession>;
    createVerificationToken(
      data: AdapterVerificationToken
    ): ConfigRequestToApiServer<
      AdapterVerificationToken,
      AdapterVerificationToken
    >;
    useVerificationToken(
      data: Omit<AdapterVerificationToken, 'expires'>
    ): ConfigRequestToApiServer<
      Omit<AdapterVerificationToken, 'expires'>,
      AdapterVerificationToken
    >;
  };
};
