/*
 * Some parts of this code were adapted from the NextAuth.js MongoDB Adapter.
 * Source: https://github.com/nextauthjs/next-auth/blob/main/packages/adapter-mongodb/src/index.ts
 * License: ISC License
 */

import { ObjectId, Types, isObjectIdOrHexString } from 'mongoose';

/**
 * Take a value to Mongoose ObjectId
 * @param value any | undefined
 * @returns ObjectId
 */
export function _id(value?: any) {
  if (isObjectIdOrHexString(value)) {
    return new Types.ObjectId(value);
  }
  return new Types.ObjectId();
}

/**
 * Check valid String ObjectId
 * @param value any
 * @returns boolean
 */
export function isStringObjectId(value: any) {
  if (value instanceof Types.ObjectId) {
    return false;
  }
  return isObjectIdOrHexString(value);
}

/**
 * Check valid ObjectId
 * @param value any
 * @returns boolean
 */
export function isObjectId(value: any) {
  return value instanceof Types.ObjectId && isObjectIdOrHexString(value);
}

/**
 * Format From Mongoose object to JavaScript object
 * @param object object (Mongoose)
 * @returns object (JavaScript)
 */
export function formatFrom<T = Record<string, unknown>>(
  object: Record<string, any>
): T {
  const newObject: Record<string, unknown> = {};
  for (const key in object) {
    const value = object[key];
    if (key === '_id') {
      if (isObjectId(value)) {
        newObject.id = value.toHexString();
      } else {
        newObject.id = _id(value).toHexString();
      }
    } else if (key === 'userId') {
      if (isObjectId(value)) {
        newObject[key] = value.toHexString();
      } else {
        newObject[key] = _id(value).toHexString();
      }
    } else if (key.includes('Id') && isObjectIdOrHexString(value)) {
      if (isObjectId(value)) {
        newObject[key] = value.toHexString();
      } else if (isStringObjectId(value)) {
        newObject[key] = _id(value).toHexString();
      } else {
        newObject[key] = value;
      }
    } else {
      newObject[key] = value;
    }
  }
  return newObject as T;
}

/**
 * Format To Mongoose ObjectId from JavaScript object
 * @param object object (JavaScript)
 * @returns object (Mongoose)
 */
export function formatTo<T = Record<string, unknown>>(
  object: Record<string, any>
) {
  const newObject: Record<string, unknown> = {
    _id: _id(object.id),
  };

  for (const key in object) {
    const value = object[key];
    if (key === 'userId') {
      if (isObjectId(value)) {
        newObject[key] = value;
      } else {
        newObject[key] = _id(value);
      }
    } else if (key.includes('Id') && isObjectIdOrHexString(value)) {
      if (isObjectId(value)) {
        newObject[key] = value;
      } else if (isStringObjectId(value)) {
        newObject[key] = _id(value);
      } else {
        newObject[key] = value;
      }
    } else if (key === 'id') continue;
    else newObject[key] = value;
  }

  return newObject as T & { _id: ObjectId };
}

/**
 * Format To Mongoose ObjectId String from JavaScript object
 * @param object object (JavaScript)
 * @returns object (Mongoose String)
 */
export function formatToMongoString<T = Record<string, unknown>>(
  object: Record<string, any>
) {
  const newObject: Record<string, unknown> = {
    _id: _id(object.id).toHexString(),
  };

  for (const key in object) {
    const value = object[key];
    if (key === 'userId') {
      if (isObjectId(value)) {
        newObject[key] = value.toHexString();
      } else if (isStringObjectId(value)) {
        newObject[key] = value;
      } else {
        newObject[key] = value;
      }
    } else if (key.includes('Id') && isObjectIdOrHexString(value)) {
      if (isObjectId(value)) {
        newObject[key] = value.toHexString();
      } else if (isStringObjectId(value)) {
        newObject[key] = value;
      } else {
        newObject[key] = value;
      }
    } else if (key === 'id') continue;
    else newObject[key] = value;
  }

  return newObject as T & { _id: ObjectId };
}
