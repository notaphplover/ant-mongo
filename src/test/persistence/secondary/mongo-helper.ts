import * as crypto from 'crypto';
import { Collection } from 'mongodb';
import { UserTest } from '../../model/user-test';

export class MongoHelper {
  public static getHash(text: string): string {
    return crypto
      .createHmac('sha256', this._secret)
      .update(text)
      .digest('hex');
  }

  public static findById(collection: Collection, id: string | number): Promise<UserTest> {
    return collection.findOne({ id: id });
  }

  public static findByIds(collection: Collection, ids: string[] | number[]): Promise<UserTest[]> {
    return collection.find({ id: { $in: ids } }).toArray();
  }

  public static insert(collection: Collection, user: UserTest): Promise<any> {
    return collection.insertOne(user);
  }

  public static mInsert(collection: Collection, users: UserTest[]): Promise<any> {
    return collection.insertMany(users);
  }

  private static _secret = 'abcdefg';
}
