import { Entity, KeyGenParams } from '@antjs/ant-js';
import { AntModel } from '@antjs/ant-js/build/model/ant-model';
import { MongoModel } from './mongo-model';

const ANT_MONGO_DEFAULT_ID = 'id';
const MONGO_DB_ID = '_id';

export class AntMongoModel<TEntity extends Entity> extends AntModel<TEntity> implements MongoModel<TEntity> {
  /**
   * Name of the MongoDB collection mapped to this model.
   */
  protected _collectionName: string;

  /**
   * Creates a new Ant Mongo model.
   * @param id Model's id.
   * @param keyGen Key generation arguments.
   * @param collectionName MongoDB collection name.
   */
  public constructor(id: string, keyGen: KeyGenParams, collectionName: string) {
    super(id, keyGen);
    this._collectionName = collectionName;
  }

  /**
   * @inheritdoc
   */
  public get collectionName(): string {
    return this._collectionName;
  }
}
