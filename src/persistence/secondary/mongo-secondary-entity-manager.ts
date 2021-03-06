import { Entity } from '@antjs/ant-js/build/ant';
import { Collection, Db, MongoClient } from 'mongodb';
import { MongoBuildArgs } from '../../model/mongo-build-args';
import { MongoModel } from '../../model/mongo-model';
import { SecondaryEntityManager } from './secondary-entity-manager';

export class MongoSecondaryEntityManager<TEntity extends Entity> implements SecondaryEntityManager<TEntity> {
  protected _db: Promise<Db>;
  protected _model: MongoModel<TEntity>;
  private _client: Promise<MongoClient>;

  public constructor(model: MongoModel<TEntity>, args: MongoBuildArgs) {
    this._model = model;
    this._client = MongoClient.connect(args.url);
    this._db = this._client.then((client) => client.db(args.dbName));
  }

  public get model(): MongoModel<TEntity> {
    return this._model;
  }

  public async delete(id: string | number): Promise<any> {
    return (await this._getCollection()).deleteOne({ [this._model.id]: id });
  }

  public async insert(entity: TEntity): Promise<any> {
    return (await this._getCollection()).insertOne(entity);
  }

  public async mDelete(ids: string[] | number[]): Promise<any> {
    return (await this._getCollection()).deleteMany({ [this._model.id]: { $in: ids } });
  }

  public async mInsert(entities: TEntity[]): Promise<any> {
    return (await this._getCollection()).insertMany(entities);
  }

  public mUpdate(entities: TEntity[]): Promise<any> {
    return this._getCollection().then((collection) => {
      return collection.bulkWrite(
        entities.map((entity) => {
          return { updateOne: { filter: { [this._model.id]: entity.id }, update: { $set: entity } } };
        }),
        { ordered: false },
      );
    });
  }

  public async update(entity: TEntity): Promise<any> {
    return (await this._getCollection()).updateOne({ [this._model.id]: entity.id }, { $set: entity });
  }

  public async getById(id: number | string): Promise<TEntity> {
    return (await this._getCollection()).findOne({ [this._model.id]: id });
  }

  public async getByIds(ids: number[] | string[]): Promise<TEntity[]> {
    return (await this._getCollection()).find({ [this._model.id]: { $in: ids } }).toArray();
  }

  public async getByIdsOrderedAsc(ids: number[] | string[]): Promise<TEntity[]> {
    return (await this._getCollection())
      .find({ [this._model.id]: { $in: ids } })
      .sort({ [this._model.id]: 1 })
      .toArray();
  }

  protected _getCollection(): Promise<Collection<any>> {
    return this._db.then((db) => db.collection(this.model.collectionName));
  }
}
