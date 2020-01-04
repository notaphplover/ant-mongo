import { Entity, PersistencyDeleteOptions, PersistencyUpdateOptions } from '@antjs/ant-js';
import { AntPrimaryModelManager } from '@antjs/ant-js/build/persistence/primary/ant-primary-model-manager';
import { SecondaryEntityManager } from '../secondary/secondary-entity-manager';
import { PrimaryModelManager } from './primary-model-manager';

export class MongoPrimaryModelManager<TEntity extends Entity>
  extends AntPrimaryModelManager<TEntity, SecondaryEntityManager<TEntity>>
  implements PrimaryModelManager<TEntity> {

  /**
   * Deletes an entity from the cache layer.
   * @param id id of the entity to delete.
   * @param options persistency options.
   * @returns Promise of entity deleted.
   */
  public async delete(id: number | string, options?: PersistencyDeleteOptions): Promise<any> {
    await this._successor.delete(id);
    return super.delete(id, options);
  }

  /**
   * Inserts an entity.
   * @param entity Entity to be inserted.
   * @param options persistency options.
   * @returns Promise of entity inserted.
   */
  public async insert(entity: TEntity, options?: PersistencyUpdateOptions): Promise<any> {
    await this._successor.insert(entity);
    return super.update(entity, options);
  }

  /**
   * Deletes entitis from their ids.
   * @param ids Id of the entity to delete.
   * @param options persistency options.
   * @returns Promise of entities deleted.
   */
  public async mDelete(ids: number[] | string[], options?: PersistencyDeleteOptions): Promise<any> {
    await this._successor.mDelete(ids);
    return super.mDelete(ids, options);
  }

  /**
   * Inserts multiple entities.
   * @param entities Entities to be inserted.
   * @param options persistency options.
   * @returns Promise of entities inserted.
   */
  public async mInsert(entities: TEntity[], options?: PersistencyUpdateOptions): Promise<any> {
    await this._successor.mInsert(entities);
    return super.mUpdate(entities, options);
  }

  /**
   * Updates multiple entities.
   * @param entities Entities to be updated.
   * @param options persistency options.
   * @returns Promise of entities updated.
   */
  public async mUpdate(entities: TEntity[], options?: PersistencyUpdateOptions): Promise<any> {
    await this._successor.mUpdate(entities);
    return super.mUpdate(entities, options);
  }

  /**
   * Updates an entity.
   * @param entity Entity to be updated.
   * @param options persistency options.
   * @returns Promise of entity deleted.
   */
  public async update(entity: TEntity, options?: PersistencyUpdateOptions): Promise<any> {
    await this._successor.update(entity);
    return super.update(entity, options);
  }
}
