import { Test } from '@antjs/ant-js/build/testapi/api/test';
import { AntMongoModelTest } from './model/AntMongoModelTest';

export class AllTest implements Test {
  public performTests(): void {
    new AntMongoModelTest().performTests();
  }
}
