import { Entity, KeyGenParams } from '@antjs/ant-js';
import { AntModel } from '@antjs/ant-js/build/model/ant-model';
import { IAntMongoModel } from './IAntMongoModel';
import { IMappingStrategy } from './IMappingStrategy';

const ANT_MONGO_DEFAULT_ID = 'id';
const MONGO_DB_ID = '_id';

const defaultMapping: IMappingStrategy = {
  docToEntity: (field: string) => (MONGO_DB_ID === field ? ANT_MONGO_DEFAULT_ID : field),
  entityToDoc: (field: string) => (ANT_MONGO_DEFAULT_ID === field ? MONGO_DB_ID : field),
  fields: [ANT_MONGO_DEFAULT_ID],
};

export class AntMongoModel<TEntity extends Entity> extends AntModel<TEntity> implements IAntMongoModel<TEntity> {
  /**
   * Name of the MongoDB collection mapped to this model.
   */
  protected _collectionName: string;
  /**
   * Mapping strategy to transform entities and MongoDB docs.
   */
  protected _mappingStrategy: IMappingStrategy;

  /**
   * Creates a new Ant Mongo model.
   * @param keyGen Key generation arguments.
   * @param collectionName MongoDB collection name.
   * @param mappingStrategy Mapping strategy.
   */
  public constructor(keyGen: KeyGenParams, collectionName: string, mappingStrategy: IMappingStrategy = defaultMapping) {
    super(mappingStrategy.docToEntity(MONGO_DB_ID), keyGen);
    this._collectionName = collectionName;
    this._mappingStrategy = mappingStrategy;
  }

  /**
   * @inheritdoc
   */
  public get collectionName(): string {
    return this._collectionName;
  }

  /**
   * @inheritdoc
   */
  public get mappingStrategy(): IMappingStrategy {
    return this._mappingStrategy;
  }
}
