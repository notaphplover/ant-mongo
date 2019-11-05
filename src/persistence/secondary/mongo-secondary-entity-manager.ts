import { Entity } from '@antjs/ant-js/build/ant';
import { Collection, MongoClient } from 'mongodb';
import { MongoModel } from '../../model/mongo-model';
import { SecondaryEntityManager } from './secondary-entity-manager';

export class MongoSecondaryEntityManager<TEntity extends Entity> implements SecondaryEntityManager<TEntity> {

  protected _model: MongoModel<TEntity>;
  private _collection: Collection;

  constructor(url: string, dbName: string, collectionName: string) {
    MongoClient.connect(url, (err, client) => {

      this._collection = client.db(dbName).collection(collectionName);

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
    return this._collection.deleteMany({ id: { $in: ids }});
  }

  public mInsert(entities: TEntity[]): Promise<any> {
    return this._collection.insertMany(entities);
  }

  public mUpdate(entities: TEntity[]): Promise<any> {
    const results: Array<Promise<any>> = [];
    for (const entity of entities) {
      const mongoId = this.model.id;
      results.push(this._collection.findOneAndUpdate({ id: mongoId }, entity));
    }
    return Promise.all(results);
  }

  public update(entity: TEntity): Promise<any> {
    const id = this.model.id;
    return this._collection.findOneAndUpdate({ id: id }, entity);
  }

  public getById(id: number | string): Promise<TEntity> {
    return this._collection.findOne({ id: id });
  }

  public getByIds(ids: number[] | string[]): Promise<TEntity[]> {
    return this._collection.find({ id: { $in: ids }}).toArray();
  }

  public getByIdsOrderedAsc(ids: number[] | string[]): Promise<TEntity[]> {
    return this._collection.find({ id: { $in: ids }}).sort({ id: 1 }).toArray();
  }

}
