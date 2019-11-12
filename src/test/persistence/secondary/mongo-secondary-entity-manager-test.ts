import { Test } from '@antjs/ant-js/build/testapi/api/test';
import { Collection, MongoClient } from 'mongodb';
import { AntMongoModel } from '../../../model/ant-mongo-model';
import { MongoSecondaryEntityManager } from '../../../persistence/secondary/mongo-secondary-entity-manager';
import { UserTest } from '../../model/user-test';

export class MongoSecondaryEntityManagerTest implements Test {
  private _url: string = 'mongodb://ant_mongo:27017';
  private _dbName: string = 'ant-mongo';
  private _collectionName = 'users';

  private _idsForTest: string[] | number[] = [
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
  ];

  private _usersForTest: UserTest[] = [
    { id: '8', name: 'Alex', country: 'Spain' },
    { id: '9', name: 'Andrew', country: 'Germany' },
    { id: '10', name: 'Dario', country: 'Spain' },
    { id: '11', name: 'Steve', country: 'Germany' },
    { id: '12', name: 'Steve A', country: 'Germany' },
    { id: '13', name: 'Micaelo', country: 'Spain' },
  ];
  private _idsCollection: string[] | number[] = [
    '1',
    '2',
    '3',
    '4',
  ];

  private _userCollection: UserTest[] = [
    { id: '1', name: 'Adrian', country: 'Spain'},
    { id: '2', name: 'Roberto', country: 'Spain'},
    { id: '4', name: 'Prueba 2', country: 'Sweden'},

    { id: '3', name: 'Prueba 1', country: 'Sweden'},
  ];

  private _entityManager: MongoSecondaryEntityManager<UserTest>;
  private _collection: Promise<Collection>;

  constructor() {
    const keyGenParams = { prefix: 'some-prefix' };
    const model = new AntMongoModel<UserTest>(keyGenParams, this._collectionName);
    this._entityManager = new MongoSecondaryEntityManager<UserTest>(model, { url: this._url, dbName: this._dbName });

    this._collection = MongoClient.connect(this._url)
      .then((client) =>  client.db(this._dbName).collection(this._collectionName));
  }

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
    it('must insert user', async (done) => {
      await this._entityManager.insert(this._usersForTest[0]);
      const result = await (await this._collection).findOne({ id: this._usersForTest[0].id }) as UserTest;
      expect(result).toEqual(this._usersForTest[0]);
      done();
    });
  }

  private _mInsertTest(): void {
    it('must insert multiple users', async (done) => {
      await this._entityManager.mInsert(this._usersForTest);
      const result = await (await this._collection)
        .find({ id: { $in: this._idsForTest } })
        .toArray() as UserTest[];
      expect(this._usersForTest).toEqual(result);
      done();
    });
  }

  private _updateTest(): void {
    it('must update user', async (done) => {
      const user: UserTest = { id: '2', country: 'Germany', name: 'Roberto' };
      await this._entityManager.update(user);
      const result = await (await this._collection).findOne({ id: '2' });
      expect(user).toEqual(result);
      done();
    });
  }

  private _mUpdateTest(): void {
    it('must update users', async (done) => {
      const users: UserTest[] = [
        { id: '1', name: 'Adrian', country: 'Spain'},
        { id: '2', name: 'Roberto', country: 'Spain'},
        { id: '4', name: 'Prueba 2', country: 'Sweden'},
        { id: '3', name: 'Prueba 1', country: 'Sweden'},
      ];
      await this._entityManager.mUpdate(users);
      const results = await (await this._collection).find({ id: { $in: this._idsCollection}}).toArray();
      expect(results).toEqual(users);
      done();
    });
  }

  private _deleteTest(): void {
    it('must delete user', async (done) => {
      await this._entityManager.delete('1');
      const result = await (await this._collection).findOne({ id: '1' });
      expect(result).toBeNull();
      done();
    });
  }

  private _mDeleteTest(): void {
    it('must delete users', async (done) => {
      await this._entityManager.mDelete(this._idsCollection);
      const result = await (await this._collection).find({ id: { $in: this._idsCollection }}).toArray();
      expect(result).toEqual([]);
      done();
    });
  }

  private _getByIdTest(): void {
    it('must get user by id', async (done) => {
      const user = await this._entityManager.getById('1');
      expect(user).toEqual(this._userCollection[0]);
      done();
    });
  }

  private _getByIdsTest(): void {
    it('must get users by ids', async (done) => {
      const users = await this._entityManager.getByIds(this._idsCollection);
      expect(users).toEqual(this._userCollection);
      done();
    });
  }

  private _getByIdsOrderedAscTest(): void {
    it('must get users by ids sorted', async (done) => {
      const users = await this._entityManager.getByIdsOrderedAsc(this._idsCollection);
      expect(users).toEqual(this._userCollection.sort(this._comparasion));
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
