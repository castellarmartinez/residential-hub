import { UserOutputPort } from "../../../../application/ports/output/userOutputPort";
import { User } from "../../../../domain/entities/user";
import { Users } from "./mongoUserModel";

export class MongoUserRepository implements UserOutputPort {
  async save(user: User): Promise<void> | never {
    Users.create(user);
  }
}
