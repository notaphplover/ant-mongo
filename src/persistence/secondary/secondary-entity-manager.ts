import { Entity } from '@antjs/ant-js';
import { SecondaryEntityManager as AntJsSecondaryEntityManager } from '@antjs/ant-js/build/persistence/secondary/secondary-entity-manager';

export interface SecondaryEntityManager<TEntity extends Entity> extends AntJsSecondaryEntityManager<TEntity> {
  /**
   * Deletes an entity from its id.
   * @param id Id of the entity to delete.
   * @returns Promise of entity deleted.
   */
  delete(id: string | number): Promise<any>;

  /**
   * Inserts an entity.
   * @param entity Entity to be inserted.
   * @returns Promise of entity inserted.
   */
  insert(entity: TEntity): Promise<any>;

  /**
   * Deletes entitis from their ids.
   * @param ids Id of the entity to delete.
   * @returns Promise of entities deleted.
   */
  mDelete(ids: string[] | number[]): Promise<any>;

  /**
   * Inserts multiple entities.
   * @param entities Entities to be inserted.
   * @returns Promise of entities inserted.
   */
  mInsert(entities: TEntity[]): Promise<any>;

  /**
   * Updates multiple entities.
   * @param entities Entities to be updated.
   * @returns Promise of entities updated.
   */
  mUpdate(entities: TEntity[]): Promise<any>;

  /**
   * Updates an entity.
   * @param entity Entity to be updated.
   * @returns Promise of entity deleted.
   */
  update(entity: TEntity): Promise<any>;
}
