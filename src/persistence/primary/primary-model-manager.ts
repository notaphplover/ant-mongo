import { Entity } from '@antjs/ant-js';
import { PrimaryModelManager as AntJsPrimaryModelManager } from '@antjs/ant-js/build/persistence/primary/primary-model-manager';
import { MongoInsertable } from './mongo-insertable';

export interface PrimaryModelManager<TEntity extends Entity>
  extends AntJsPrimaryModelManager<TEntity>,
    MongoInsertable<TEntity> {}
