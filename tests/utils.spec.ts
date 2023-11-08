import assert from 'assert';
import {
  _id,
  formatFrom,
  formatTo,
  isStringObjectId,
  isObjectId,
  formatToMongoString,
} from '../src/utils';
import {
  accountJs,
  accountMongo,
  idString,
  idStringIncorrect,
  mockTestJsObjectId,
  mockTestJsString,
  mockTestMongo,
  mockTestMongoString,
  mockTestjs,
  sessionJs,
  sessionMongo,
  userJs,
  userMongo,
  userMongoString,
  verificationTokenJs,
  verificationTokenMongo,
} from './test.data';

describe('Utils tests', function () {
  it('Test _id param ObjectId should return ObjectId', function () {
    assert.equal(_id(_id(idString)).toHexString(), _id(idString).toHexString());
  });
  it('Test _id param StringObjectId should return ObjectId', function () {
    assert.equal(_id(idString).toHexString(), idString);
  });
  it('Test _id param Incorrect String should return new ObjectId', function () {
    assert.notEqual(_id(idStringIncorrect), _id(idString));
  });
  it('Test isStringObjectId param StringObjectId should return true', function () {
    assert.equal(isStringObjectId(idString), true);
  });
  it('Test isStringObjectId param Incorrect String should return false', function () {
    assert.equal(isStringObjectId(idStringIncorrect), false);
  });
  it('Test isStringObjectId param ObjectId should return false', function () {
    assert.equal(isStringObjectId(_id(idString)), false);
  });
  it('Test isObjectId param ObjectId should return true', function () {
    assert.equal(isObjectId(_id(idString)), true);
  });
  it('Test isObjectId param StringObjectId should return false', function () {
    assert.equal(isObjectId(idString), false);
  });
  it('Test isObjectId param Object should return false', function () {
    assert.equal(isObjectId({ data: 12345 }), false);
  });
  it('Test formatFrom param Mongoose object to Javascript object', function () {
    assert.equal(JSON.stringify(formatFrom(userMongo)), JSON.stringify(userJs));
  });
  it('Test formatFrom param Mongoose ObjectId string to Javascript object', function () {
    assert.equal(
      JSON.stringify(formatFrom(userMongoString)),
      JSON.stringify(userJs)
    );
  });
  it('Test formatFrom param Mongoose object string to Javascript object', function () {
    assert.equal(
      JSON.stringify(formatFrom(mockTestMongoString)),
      JSON.stringify(mockTestJsString)
    );
  });
  it('Test formatFrom param JavaScript ObjectId to Mongoose object', function () {
    assert.equal(
      JSON.stringify(formatFrom(mockTestJsObjectId)),
      JSON.stringify(mockTestJsString)
    );
  });
  it('Test formatTo param JavaScript objectId to Mongoose object', function () {
    assert.equal(
      JSON.stringify(formatTo(mockTestJsObjectId)),
      JSON.stringify(mockTestMongoString)
    );
  });
  it('Test formatTo param User JavaScript object to Mongoose object', function () {
    assert.equal(JSON.stringify(formatTo(userJs)), JSON.stringify(userMongo));
  });
  it('Test formatFrom param Account Mongoose object to Javascript object', function () {
    assert.equal(
      JSON.stringify(formatFrom(accountMongo)),
      JSON.stringify(accountJs)
    );
  });
  it('Test formatTo param Account Javascript object to Mongoose object', function () {
    assert.equal(
      JSON.stringify(formatTo(accountJs)),
      JSON.stringify(accountMongo)
    );
  });
  it('Test formatFrom param Mongoose Session object to Javascript object', function () {
    assert.equal(
      JSON.stringify(formatFrom(sessionMongo)),
      JSON.stringify(sessionJs)
    );
  });
  it('Test formatTo param Session JavaScript object to Mongoose object', function () {
    assert.equal(
      JSON.stringify(formatTo(sessionJs)),
      JSON.stringify(sessionMongo)
    );
  });
  it('Test formatFrom param VerificationToken Mongoose object to Javascript object', function () {
    assert.equal(
      JSON.stringify(formatFrom(verificationTokenMongo)),
      JSON.stringify(verificationTokenJs)
    );
  });
  it('Test formatTo param VerificationToken JavaScript object from Mongoose object', function () {
    assert.equal(
      JSON.stringify(formatTo(verificationTokenJs)),
      JSON.stringify(verificationTokenMongo)
    );
  });
  it('Test formatFrom param MockData Mongoose object to Javascript object', function () {
    assert.equal(
      JSON.stringify(formatFrom(mockTestMongo)),
      JSON.stringify(mockTestjs)
    );
  });
  it('Test formatTo param MockData JavaScript object to Mongoose object', function () {
    assert.equal(
      JSON.stringify(formatTo(mockTestjs)),
      JSON.stringify(mockTestMongo)
    );
  });
  it('Test formatToMongoString param JavaScript objectId to Mongoose object', function () {
    assert.equal(
      JSON.stringify(formatToMongoString(mockTestJsObjectId)),
      JSON.stringify(mockTestMongoString)
    );
  });
  it('Test formatToMongoString param User JavaScript object to Mongoose object', function () {
    assert.equal(
      JSON.stringify(formatToMongoString(userJs)),
      JSON.stringify(userMongo)
    );
  });
  it('Test formatToMongoString param Account Javascript object to Mongoose object', function () {
    assert.equal(
      JSON.stringify(formatToMongoString(accountJs)),
      JSON.stringify(accountMongo)
    );
  });
  it('Test formatToMongoString param Session JavaScript object to Mongoose object', function () {
    assert.equal(
      JSON.stringify(formatToMongoString(sessionJs)),
      JSON.stringify(sessionMongo)
    );
  });
  it('Test formatToMongoString param VerificationToken JavaScript object from Mongoose object', function () {
    assert.equal(
      JSON.stringify(formatToMongoString(verificationTokenJs)),
      JSON.stringify(verificationTokenMongo)
    );
  });
  it('Test formatToMongoString param MockData JavaScript object to Mongoose object', function () {
    assert.equal(
      JSON.stringify(formatToMongoString(mockTestjs)),
      JSON.stringify(mockTestMongo)
    );
  });
});
