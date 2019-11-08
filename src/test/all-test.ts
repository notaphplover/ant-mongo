import { Test } from '@antjs/ant-js/build/testapi/api/test';
import { AntMongoModelTest } from './model/ant-mongo-model-test';
import { MongoSecondaryEntityManagerTest } from './mongo-secondary-entity-manager-test';

export class AllTest implements Test {
  public performTests(): void {
    new AntMongoModelTest().performTests();
    new MongoSecondaryEntityManagerTest().performTests();
  }
}
