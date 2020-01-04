import { Entity, Model } from '@antjs/ant-js';

export interface MongoModel<TEntity extends Entity> extends Model<TEntity> {
  /**
   * Name of the MongoDB collection mapped to this model.
   */
  collectionName: string;
}
