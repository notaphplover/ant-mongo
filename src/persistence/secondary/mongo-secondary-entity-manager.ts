import { Entity } from '@antjs/ant-js/build/ant';
import { Collection, MongoClient } from 'mongodb';
import { MongoModel } from '../../model/mongo-model';
import { MongoBuildArgs } from '../../model/MongoBuildArgs';
import { SecondaryEntityManager } from './secondary-entity-manager';

export class MongoSecondaryEntityManager<TEntity extends Entity> implements SecondaryEntityManager<TEntity> {
  protected _model: MongoModel<TEntity>;
  private _collection: Collection;
  private _client: MongoClient;

  constructor(model: MongoModel<TEntity>, args: MongoBuildArgs) {
    this._model = model;
    MongoClient.connect(args.url, (err, client) => {
      this._client = client;
      this._collection = client.db(args.dbName).collection(this._model.collectionName);

      client.close();
    });
  }

  public get model(): MongoModel<TEntity> {
    return this._model;
  }

  public delete(id: string | number): Promise<any> {
    return this._collection.findOneAndDelete({ id: id });
  }

  public insert(entity: TEntity): Promise<any> {
    return this._collection.insertOne(entity);
  }

  public mDelete(ids: string[] | number[]): Promise<any> {
    return this._collection.deleteMany({ id: { $in: ids } });
  }

  public mInsert(entities: TEntity[]): Promise<any> {
    return this._collection.insertMany(entities);
  }

  public async mUpdate(entities: TEntity[]): Promise<any> {
    const session = this._client.startSession();
    try {
      await session.withTransaction(() => {
        const results: Array<Promise<any>> = [];
        for (const entity of entities) {
          const mongoId = this.model.id;
          results.push(this._collection.findOneAndUpdate({ id: mongoId }, entity));
        }
        return Promise.all(results);
      });
    } finally {
      await session.endSession();
    }
  }

  public update(entity: TEntity): Promise<any> {
    const id = this.model.id;
    return this._collection.findOneAndUpdate({ id: id }, entity);
  }

  public getById(id: number | string): Promise<TEntity> {
    return this._collection.findOne({ id: id });
  }

  public getByIds(ids: number[] | string[]): Promise<TEntity[]> {
    return this._collection.find({ id: { $in: ids } }).toArray();
  }

  public getByIdsOrderedAsc(ids: number[] | string[]): Promise<TEntity[]> {
    return this._collection
      .find({ id: { $in: ids } })
      .sort({ id: 1 })
      .toArray();
  }
}
