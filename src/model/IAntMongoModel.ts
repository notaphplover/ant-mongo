import { IModel } from '@antjs/ant-js/src/model/IModel';
import { IMappingStrategy } from './IMappingStrategy';

export interface IAntMongoModel extends IModel {
  /**
   * Name of the MongoDB collection mapped to this model.
   */
  collectionName: string;

  /**
   * Mapping strategy to transform entities and MongoDB docs.
   */
  mappingStrategy: IMappingStrategy;
}
