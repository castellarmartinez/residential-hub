import { UserOutputPort } from "../../../../application/ports/output/userOutputPort";
import { User } from "../../../../domain/entities/user";
import { NotFoundError } from "../../../../domain/errors/notFoundError";
import { TUser } from "../../../../domain/types/userType";
import { MongoUser } from "./mongoUserModel";

export class MongoUserRepository implements UserOutputPort {
  async save(user: User): Promise<void> | never {
    MongoUser.create({
      _id: user.getId(),
      email: user.getEmail(),
      password: user.getPassword(),
      names: user.getNames(),
      lastNames: user.getLastNames(),
    });
  }

  async findAll(): Promise<User[]> | never {
    return (await MongoUser.find({})).map(
      (user) =>
        new User(
          user._id,
          user.email,
          user.password,
          user.names,
          user.lastNames
        )
    );
  }

  async findById(id: string): Promise<User> | never {
    const user = await MongoUser.findOne({ _id: id });

    if (user) {
      return new User(
        user._id,
        user.email,
        user.password,
        user.names,
        user.names
      );
    }

    throw new NotFoundError(`User with id=${id} does not exist`);
  }

  async update(id: string, fieldsToUpdate: TUser): Promise<User> | never {
    const updatedUser = await MongoUser.findOneAndUpdate(
      { _id: id },
      { $set: { ...fieldsToUpdate } },
      { new: true }
    );

    if (!updatedUser) {
      throw new NotFoundError(`User with id=${id} does not exist`);
    }

    return new User(
      updatedUser._id,
      updatedUser.email,
      updatedUser.password,
      updatedUser.names,
      updatedUser.lastNames
    );
  }
}
