import { Entity, Model } from '@antjs/ant-js/build/ant';
import { Collection, MongoClient } from 'mongodb';
import { SecondaryEntityManager } from './secondary-entity-manager';

export class MongoSecondaryEntityManager<TEntity extends Entity> implements SecondaryEntityManager<TEntity> {

  model: Model<TEntity>;
  private collection: Collection;

  constructor(url: string, dbName: string, collectionName: string) {
    MongoClient.connect(url, (err, client) => {

      this.collection = client.db(dbName).collection(collectionName);

      client.close();

    });
  }

  delete(id: string | number): Promise<any> {
    return this.collection.findOneAndDelete({ id: id });
  }

  insert(entity: TEntity): Promise<any> {
    return this.collection.insertOne(entity);
  }

  mDelete(ids: string[] | number[]): Promise<any> {
    return this.collection.deleteMany({ id: { $in: ids }});
  }

  mInsert(entities: TEntity[]): Promise<any> {
    return this.collection.insertMany(entities);
  }

  mUpdate(entities: TEntity[]): Promise<any> {
    const results: Array<Promise<any>> = [];
    for (const entity of entities) {
      const mongoId = this.model.id;
      results.push(this.collection.findOneAndUpdate({ id: mongoId }, entity));
    }
    return results;
  }

  update(entity: TEntity): Promise<any> {
    const id = this.model.id;
    return this.collection.findOneAndUpdate({ id: id }, entity);
  }

  getById(id: number | string): Promise<TEntity> {
    return this.collection.findOne({ id: id });
  }

  getByIds(ids: number[] | string[]): Promise<TEntity[]> {
    return this.collection.find({ id: { $in: ids }});
  }

  getByIdsOrderedAsc(ids: number[] | string[]): Promise<TEntity[]> {
    return this.collection.find({ id: { $in: ids }}).sort({ id: 1 });
  }

}
