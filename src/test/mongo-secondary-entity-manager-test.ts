import { Test } from '@antjs/ant-js/build/testapi/api/test';
import { Collection, MongoClient } from 'mongodb';
import { MongoSecondaryEntityManager } from '../persistence/secondary/mongo-secondary-entity-manager';
import { UserTest } from './user-test';

export class MongoSecondaryEntityManagerTest implements Test {
  private _entityManager: MongoSecondaryEntityManager<UserTest>;
  private _collection: Collection;
  private _client: MongoClient;

  constructor() {
    MongoClient.connect('ant_mongo::27017', (err, client) => {
      this._client = client;
      this._collection = client.db('ant-mongo').collection('users');
    });
  }

  public performTests(): void {
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
    it('must be initializable', async (done) => {

      done();
    });
  }

  private _mInsertTest(): void {
    it('must be initializable', async (done) => {

      done();
    });
  }

  private _updateTest(): void {
    it('must be initializable', async (done) => {

      done();
    });
  }

  private _mUpdateTest(): void {
    it('must be initializable', async (done) => {

      done();
    });
  }

  private _deleteTest(): void {
    it('must be initializable', async (done) => {

    });
  }

  private _mDeleteTest(): void {
    it('must be initializable', async (done) => {

      done();
    });
  }

  private _getByIdTest(): void {
    it('must be initializable', async (done) => {

      done();
    });
  }

  private _getByIdsTest(): void {
    it('must be initializable', async (done) => {

      done();
    });
  }

  private _getByIdsOrderedAscTest(): void {
    it('must be initializable', async (done) => {

      done();
    });
  }
}
