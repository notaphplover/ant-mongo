import { ITest } from '@antjs/ant-js/src/testapi/api/ITest';
import { AntMongoModelTest } from './model/AntMongoModelTest';

export class AllTest implements ITest {
  public performTests(): void {
    new AntMongoModelTest().performTests();
  }
}
