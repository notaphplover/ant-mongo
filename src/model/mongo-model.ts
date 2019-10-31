import { Entity, Model } from '@antjs/ant-js';
import { MappingStrategy } from './mapping-strategy';

export interface MongoModel<TEntity extends Entity> extends Model<TEntity> {
  /**
   * Name of the MongoDB collection mapped to this model.
   */
  collectionName: string;

  /**
   * Mapping strategy to transform entities and MongoDB docs.
   */
  mappingStrategy: MappingStrategy;
}
