import { ITest } from '@antjs/ant-js/src/testapi/api/ITest';
import { AntMongoModel } from '../../model/AntMongoModel';

export class AntMongoModelTest implements ITest {
  public performTests(): void {
    describe('Ant MongoDB Model tests', () => {
      this._itMustBeInitializable();
      this._itMustStoreInitialValues();
    });
  }

  private _itMustBeInitializable(): void {
    it('must be initializable', async (done) => {
      expect(() => new AntMongoModel({ prefix: 'some-prefix' }, 'my-sample-model')).not.toThrowError();
      done();
    });
  }

  private _itMustStoreInitialValues(): void {
    it('must store initial values', async (done) => {
      const keyGenParams = { prefix: 'some-prefix' };
      const collectionName = 'my-sample-model';
      const mappings = {
        docToEntity: () => 'id',
        entityToDoc: () => '_id',
        fields: ['id'],
      };
      const model = new AntMongoModel(keyGenParams, collectionName, mappings);

      expect(model.collectionName).toBe(collectionName);
      expect(model.mappingStrategy).toBe(mappings);
      done();
    });
  }
}
