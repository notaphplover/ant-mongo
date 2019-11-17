import { Test } from '@antjs/ant-js/build/testapi/api/test';
import { Collection, MongoClient } from 'mongodb';
import { AntMongoModel } from '../../../model/ant-mongo-model';
import { MongoSecondaryEntityManager } from '../../../persistence/secondary/mongo-secondary-entity-manager';
import { UserTest } from '../../model/user-test';
import { MongoHelper } from './mongo-helper';

export class MongoSecondaryEntityManagerTest implements Test {
  private _url: string = 'mongodb://ant_mongo:27017';
  private _dbName: string = 'ant-mongo';

  private _keyGenParams = { prefix: 'some-prefix' };

  private _idsForTest: string[] | number[] = ['8', '9', '10', '11', '12', '13'];

  private _usersForTest: UserTest[] = [
    { id: '8', name: 'Alex', country: 'Spain' },
    { id: '9', name: 'Andrew', country: 'Germany' },
    { id: '10', name: 'Dario', country: 'Spain' },
    { id: '11', name: 'Steve', country: 'Germany' },
    { id: '12', name: 'Steve A', country: 'Germany' },
    { id: '13', name: 'Micaelo', country: 'Spain' },
  ];
  private _idsCollection: string[] | number[] = ['1', '2', '3', '4'];

  private _userCollection: UserTest[] = [
    { id: '1', name: 'Adrian', country: 'Spain' },
    { id: '2', name: 'Roberto', country: 'Spain' },
    { id: '4', name: 'Prueba 2', country: 'Sweden' },
    { id: '3', name: 'Prueba 1', country: 'Sweden' },
  ];

  public async performTests(): Promise<void> {
    describe('Mongo secondary entity manager test', () => {
      this._insertTest();
      this._mInsertTest();
      this._updateTest();
      this._mUpdateTest();
      this._deleteTest();
      this._mDeleteTest();
      this._getByIdTest();
      this._getByIdsTest();
      this._getByIdsOrderedAscTest();
    });
  }

  private _insertTest(): void {
    const text = 'must insert user';
    const hash = MongoHelper.getHash(text);
    it(text, async (done) => {
      const model = new AntMongoModel<UserTest>(this._keyGenParams, hash);
      const entityManager = new MongoSecondaryEntityManager<UserTest>(model, { url: this._url, dbName: this._dbName });
      const collection = (await MongoClient.connect(this._url)).db(this._dbName).collection(hash);

      await entityManager.insert(this._usersForTest[0]);
      const result = await MongoHelper.findById(collection, this._usersForTest[0].id);
      expect(result).toEqual(this._usersForTest[0]);
      done();
    });
  }

  private _mInsertTest(): void {
    const text = 'must insert multiple users';
    const hash = MongoHelper.getHash(text);
    it(text, async (done) => {
      const model = new AntMongoModel<UserTest>(this._keyGenParams, hash);
      const entityManager = new MongoSecondaryEntityManager<UserTest>(model, { url: this._url, dbName: this._dbName });
      const collection = (await MongoClient.connect(this._url)).db(this._dbName).collection(hash);

      await entityManager.mInsert(this._usersForTest);
      const result = await MongoHelper.findByIds(collection, this._idsForTest);
      expect(result).toEqual(this._usersForTest);
      done();
    });
  }

  private _updateTest(): void {
    const text = 'must update user';
    const hash = MongoHelper.getHash(text);
    it(text, async (done) => {
      const model = new AntMongoModel<UserTest>(this._keyGenParams, hash);
      const entityManager = new MongoSecondaryEntityManager<UserTest>(model, { url: this._url, dbName: this._dbName });
      const collection = (await MongoClient.connect(this._url)).db(this._dbName).collection(hash);

      const user: UserTest = { id: '2', country: 'Germany', name: 'Roberto' };
      await MongoHelper.insert(collection, this._userCollection[1]);
      await entityManager.update(user);
      const result = await MongoHelper.findById(collection, this._idsCollection[1]);
      expect(result.id).toEqual(user.id);
      expect(result.name).toEqual(user.name);
      expect(result.country).toEqual(user.country);
      done();
    });
  }

  private _mUpdateTest(): void {
    const text = 'must update users';
    const hash = MongoHelper.getHash(text);
    it(text, async (done) => {
      const model = new AntMongoModel<UserTest>(this._keyGenParams, hash);
      const entityManager = new MongoSecondaryEntityManager<UserTest>(model, { url: this._url, dbName: this._dbName });
      const collection = (await MongoClient.connect(this._url)).db(this._dbName).collection(hash);
      const users: UserTest[] = [
        { id: '1', name: 'Pepito', country: 'Spain' },
        { id: '2', name: 'Roberto', country: 'Germany' },
        { id: '4', name: 'Eustaquio', country: 'Spain' },
        { id: '3', name: 'Prueba 5', country: 'Sweden' },
      ];
      await MongoHelper.mInsert(collection, this._userCollection);
      await entityManager.mUpdate(users);
      const results = await collection.find({ id: { $in: this._idsCollection } }).toArray();
      expect(results.length).toEqual(users.length);
      for (let i = 0; i < results.length; i++) {
        expect(results[i].id).toEqual(users[i].id);
        expect(results[i].name).toEqual(users[i].name);
        expect(results[i].country).toEqual(users[i].country);
      }
      done();
    });
  }

  private _deleteTest(): void {
    const text = 'must delete user';
    const hash = MongoHelper.getHash(text);
    it(text, async (done) => {
      const model = new AntMongoModel<UserTest>(this._keyGenParams, hash);
      const entityManager = new MongoSecondaryEntityManager<UserTest>(model, { url: this._url, dbName: this._dbName });
      const collection = (await MongoClient.connect(this._url)).db(this._dbName).collection(hash);

      await MongoHelper.insert(collection, this._userCollection[0]);
      await entityManager.delete(this._idsCollection[0]);
      const result = await MongoHelper.findById(collection, this._idsCollection[0]);
      expect(result).toBeNull();
      done();
    });
  }

  private _mDeleteTest(): void {
    const text = 'must delete users';
    const hash = MongoHelper.getHash(text);
    it(text, async (done) => {
      const model = new AntMongoModel<UserTest>(this._keyGenParams, hash);
      const entityManager = new MongoSecondaryEntityManager<UserTest>(model, { url: this._url, dbName: this._dbName });
      const collection = (await MongoClient.connect(this._url)).db(this._dbName).collection(hash);

      await MongoHelper.mInsert(collection, this._userCollection);
      await entityManager.mDelete(this._idsCollection);
      const result = await MongoHelper.findByIds(collection, this._idsCollection);
      expect(result).toEqual([]);
      done();
    });
  }

  private _getByIdTest(): void {
    const text = 'must get user by id';
    const hash = MongoHelper.getHash(text);
    it(text, async (done) => {
      const model = new AntMongoModel<UserTest>(this._keyGenParams, hash);
      const entityManager = new MongoSecondaryEntityManager<UserTest>(model, { url: this._url, dbName: this._dbName });
      const collection = (await MongoClient.connect(this._url)).db(this._dbName).collection(hash);

      await MongoHelper.insert(collection, this._userCollection[0]);
      const user = await entityManager.getById(this._idsCollection[0]);
      expect(user).toEqual(this._userCollection[0]);
      done();
    });
  }

  private _getByIdsTest(): void {
    const text = 'must get users by ids';
    const hash = MongoHelper.getHash(text);
    it(text, async (done) => {
      const model = new AntMongoModel<UserTest>(this._keyGenParams, hash);
      const entityManager = new MongoSecondaryEntityManager<UserTest>(model, { url: this._url, dbName: this._dbName });
      const collection = (await MongoClient.connect(this._url)).db(this._dbName).collection(hash);

      await MongoHelper.mInsert(collection, this._userCollection);
      const users = await entityManager.getByIds(this._idsCollection);
      expect(users).toEqual(this._userCollection);
      done();
    });
  }

  private _getByIdsOrderedAscTest(): void {
    const text = 'must get users by ids sorted';
    const hash = MongoHelper.getHash(text);
    it(text, async (done) => {
      const model = new AntMongoModel<UserTest>(this._keyGenParams, hash);
      const entityManager = new MongoSecondaryEntityManager<UserTest>(model, { url: this._url, dbName: this._dbName });
      const collection = (await MongoClient.connect(this._url)).db(this._dbName).collection(hash);

      await MongoHelper.mInsert(collection, this._userCollection);
      const users = await entityManager.getByIdsOrderedAsc(this._idsCollection);
      const aux = this._userCollection;
      expect(users).toEqual(aux.sort(this._comparasion));
      done();
    });
  }

  private _comparasion(a: UserTest, b: UserTest): number {
    if (a.id < b.id) {
      return -1;
    } else if (a.id > b.id) {
      return 1;
    } else {
      return 0;
    }
  }
}