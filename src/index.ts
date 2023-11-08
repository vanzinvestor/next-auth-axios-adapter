import { AxiosInstance, AxiosStatic } from 'axios';
import { Adapter } from 'next-auth/adapters';
import { _id, formatFrom, formatToMongoString } from './utils';
import httpClient from './http-client';
import {
  AdapterSettings,
  HttpMethods,
  ConfigRequestToApiServer,
} from './types';

export type { AdapterSettings, HttpMethods, ConfigRequestToApiServer };

export const AxiosAdapter = (
  axios: AxiosInstance | AxiosStatic,
  settings: AdapterSettings
): Adapter => {
  const http = httpClient(axios);

  return {
    // @ts-expect-error
    async createUser(data) {
      // console.log('createUser', data);
      const opt = settings.configs.createUser(data);

      try {
        let value = opt.sendBody;

        if (opt.isMongoDb && opt.sendBody) {
          const { _id, ...obj } = formatToMongoString(opt.sendBody);
          value = obj as any;
        }

        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          value,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return formatFrom(opt.selectedData(res));
        }

        return opt.selectedData(res);
      } catch (error: any) {
        return null;
      }
    },
    // @ts-expect-error
    async getUser(id) {
      // console.log('getUser', id);
      const opt = settings.configs.getUser(id);

      try {
        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          opt.sendBody,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return formatFrom(opt.selectedData(res));
        }

        return opt.selectedData(res);
      } catch (error: any) {
        null;
      }
    },
    async getUserByEmail(email) {
      // console.log('getUserByEmail', email);
      const opt = settings.configs.getUserByEmail(email);
      try {
        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          opt.sendBody,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return formatFrom(opt.selectedData(res));
        }

        return opt.selectedData(res);
      } catch (error) {
        return null;
      }
    },
    async getUserByAccount(data) {
      // console.log('getUserByAccount', data);
      const opt = settings.configs.getUserByAccount(data);
      try {
        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          opt.sendBody,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return formatFrom(opt.selectedData(res));
        }

        return opt.selectedData(res);
      } catch (error) {
        return null;
      }
    },
    // @ts-expect-error
    async updateUser(data) {
      // console.log('updateUser', data);
      const opt = settings.configs.updateUser(data);
      try {
        let value = opt.sendBody;

        if (opt.isMongoDb && opt.sendBody) {
          value = formatToMongoString(opt.sendBody);
        }

        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          value,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return formatFrom(opt.selectedData(res));
        }

        return opt.selectedData(res);
      } catch (error) {
        return null;
      }
    },
    // @ts-expect-error
    async deleteUser(id) {
      // console.log('deleteUser', id);
      const opt = settings.configs.deleteUser(id);
      try {
        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          opt.sendBody,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return formatFrom(opt.selectedData(res));
        }

        return opt.selectedData(res);
      } catch (error) {
        return null;
      }
    },
    // @ts-expect-error
    async linkAccount(data) {
      // console.log('linkAccount', data);
      const opt = settings.configs.linkAccount(data);
      try {
        let value = opt.sendBody;

        if (opt.isMongoDb && opt.sendBody) {
          const { _id, ...obj } = formatToMongoString(opt.sendBody);
          value = obj as any;
        }

        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          value,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return formatFrom(opt.selectedData(res));
        }

        return opt.selectedData(res);
      } catch (error) {
        return null;
      }
    },
    // @ts-expect-error
    async unlinkAccount(data) {
      // console.log('unlinkAccount', data);
      const opt = settings.configs.unlinkAccount(data);
      try {
        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          opt.sendBody,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return formatFrom(opt.selectedData(res));
        }

        return opt.selectedData(res);
      } catch (error) {
        return null;
      }
    },
    async getSessionAndUser(sessionToken) {
      // console.log('getSessionAndUser', sessionToken);
      const opt = settings.configs.getSessionAndUser(sessionToken);
      try {
        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          opt.sendBody,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return {
            user: formatFrom(opt.selectedData(res).user),
            session: formatFrom(opt.selectedData(res).session),
          };
        }

        return opt.selectedData(res);
      } catch (error) {
        return null;
      }
    },
    // @ts-expect-error
    async createSession(data) {
      // console.log('createSession', data);
      const opt = settings.configs.createSession(data);
      try {
        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          opt.sendBody,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return formatFrom(opt.selectedData(res));
        }

        return opt.selectedData(res);
      } catch (error) {
        return null;
      }
    },
    async updateSession(data) {
      // console.log('updateSession', data);
      const opt = settings.configs.updateSession(data);
      try {
        let value = opt.sendBody;

        if (opt.isMongoDb && opt.sendBody) {
          value = formatToMongoString(opt.sendBody);
        }

        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          value,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return formatFrom(opt.selectedData(res));
        }

        return opt.selectedData(res);
      } catch (error) {
        return null;
      }
    },
    // @ts-expect-error
    async deleteSession(sessionToken) {
      // console.log('deleteSession', sessionToken);
      const opt = settings.configs.deleteSession(sessionToken);
      try {
        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          opt.sendBody,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return formatFrom(opt.selectedData(res));
        }

        return opt.selectedData(res);
      } catch (error) {
        return null;
      }
    },
    async createVerificationToken(data) {
      // console.log('createVerificationToken', data);
      const opt = settings.configs.createVerificationToken(data);
      try {
        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          opt.sendBody,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return formatFrom(opt.selectedData(res));
        }

        return opt.selectedData(res);
      } catch (error) {
        return null;
      }
    },
    async useVerificationToken(data) {
      // console.log('useVerificationToken', data);
      const opt = settings.configs.useVerificationToken(data);
      try {
        const res = await http(
          opt.method,
          settings.baseUrl + opt.path,
          opt.sendBody,
          opt.requestConfig
        );

        if (opt.isMongoDb) {
          return formatFrom(opt.selectedData(res));
        }

        return opt.selectedData(res);
      } catch (error) {
        return null;
      }
    },
  };
};

export default AxiosAdapter;
