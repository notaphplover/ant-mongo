import { Entity } from '@antjs/ant-js/build/ant';
import { Collection, MongoClient } from 'mongodb';
import { MongoBuildArgs } from '../../model/mongo-build-args';
import { MongoModel } from '../../model/mongo-model';
import { SecondaryEntityManager } from './secondary-entity-manager';

export class MongoSecondaryEntityManager<TEntity extends Entity> implements SecondaryEntityManager<TEntity> {
  protected _model: MongoModel<TEntity>;
  private _collection: Promise<Collection>;
  private _client: MongoClient;

  constructor(model: MongoModel<TEntity>, args: MongoBuildArgs) {
    this._model = model;
    this._collection = MongoClient.connect(args.url).then((client) => {
      this._client = client;
      return client.db(args.dbName).collection(this._model.collectionName);
    });
  }

  public get model(): MongoModel<TEntity> {
    return this._model;
  }

  public async delete(id: string | number): Promise<any> {
    return (await this._collection).findOneAndDelete({ id: id });
  }

  public async insert(entity: TEntity): Promise<any> {
    return (await this._collection).insertOne(entity);
  }

  public async mDelete(ids: string[] | number[]): Promise<any> {
    return (await this._collection).deleteMany({ id: { $in: ids } });
  }

  public async mInsert(entities: TEntity[]): Promise<any> {
    return (await this._collection).insertMany(entities);
  }

  public async mUpdate(entities: TEntity[]): Promise<any> {
    const session = this._client.startSession();
    return session.withTransaction(() =>
      Promise.all(entities.map(async (entity) =>
        (await this._collection).findOneAndUpdate({ id: this.model.id }, entity))),
    ).finally(session.endSession);
  }

  public async update(entity: TEntity): Promise<any> {
    const id = this.model.id;
    return (await this._collection).findOneAndUpdate({ id: id }, entity);
  }

  public async getById(id: number | string): Promise<TEntity> {
    return (await this._collection).findOne({ id: id });
  }

  public async getByIds(ids: number[] | string[]): Promise<TEntity[]> {
    return (await this._collection).find({ id: { $in: ids } }).toArray();
  }

  public async getByIdsOrderedAsc(ids: number[] | string[]): Promise<TEntity[]> {
    return (await this._collection)
      .find({ id: { $in: ids } })
      .sort({ id: 1 })
      .toArray();
  }
}
