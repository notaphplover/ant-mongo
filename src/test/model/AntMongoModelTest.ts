import { ITest } from '@antjs/ant-js/src/testapi/api/ITest';
import { AntMongoModel } from '../../model/AntMongoModel';

export class AntMongoModelTest implements ITest {
  public performTests(): void {
    describe('Ant MongoDB Model tests', () => {
      this._itMustBeInitializable();
    });
  }

  private _itMustBeInitializable(): void {
    it('must be initializable', async (done) => {
      expect(() => new AntMongoModel({ prefix: 'some-prefix' }, 'my-sample-model')).not.toThrowError();
      done();
    });
  }
}
