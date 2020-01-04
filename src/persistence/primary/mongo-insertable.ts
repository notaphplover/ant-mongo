import { Entity, PersistencyUpdateOptions } from '@antjs/ant-js';

export interface MongoInsertable<TEntity extends Entity> {
  /**
   * Inserts an entity.
   * @param entity Entity to be inserted.
   * @param options persistency options.
   * @returns Promise of entity inserted.
   */
  insert(entity: TEntity, options?: PersistencyUpdateOptions): Promise<any>;

  /**
   * Inserts multiple entities.
   * @param entities Entities to be inserted.
   * @param options persistency options.
   * @returns Promise of entities inserted.
   */
  mInsert(entities: TEntity[], options?: PersistencyUpdateOptions): Promise<any>;
}
