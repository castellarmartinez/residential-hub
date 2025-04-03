import { UserOutputPort } from "../../../../application/ports/output/userOutputPort";
import { User } from "../../../../domain/entities/user";
import { NotFoundError } from "../../../../domain/errors/notFoundError";
import { MongoUser } from "./mongoUserModel";

export class MongoUserRepository implements UserOutputPort {
  async save(user: User): Promise<void> | never {
    await MongoUser.create({
      _id: user.getId(),
      email: user.getEmail(),
      password: user.getPassword(),
      names: user.getNames(),
      lastNames: user.getLastNames(),
      units: user.getUnits(),
      associations: user.getAssociations(),
    });
  }

  async findAll(): Promise<User[]> | never {
    const users = await MongoUser.find({})
      .populate({ path: "units", select: "-users -associationId -__v" })
      .populate({ path: "associations", select: "-units -users -__v" });

    return users.map(
      (user) =>
        new User(
          user._id,
          user.email,
          user.password,
          user.names,
          user.lastNames,
          user.associations,
          user.units
        )
    );
  }

  async findById(id: string): Promise<User> | never {
    const user = await MongoUser.findOne({ _id: id })
      .populate({ path: "units", select: "-users -associationId -__v" })
      .populate({ path: "associations", select: "-units -users -__v" });

    if (user) {
      return new User(
        user._id,
        user.email,
        user.password,
        user.names,
        user.names,
        user.associations,
        user.units
      );
    }

    throw new NotFoundError(`User with id=${id} does not exist`);
  }

  async update(
    id: string,
    fieldsToUpdate: Partial<User>
  ): Promise<User> | never {
    const updatedUser = await MongoUser.findByIdAndUpdate(
      { _id: id },
      { $set: { ...fieldsToUpdate } },
      { new: true }
    )
      .populate({ path: "units", select: "-users -associationId -__v" })
      .populate({ path: "associations", select: "-units -users -__v" });

    if (!updatedUser) {
      throw new NotFoundError(`User with id=${id} does not exist`);
    }

    return new User(
      updatedUser._id,
      updatedUser.email,
      updatedUser.password,
      updatedUser.names,
      updatedUser.lastNames,
      updatedUser.associations,
      updatedUser.units
    );
  }

  async delete(id: string): Promise<void> | never {
    const user = await MongoUser.findByIdAndDelete({ _id: id });

    if (!user) {
      throw new NotFoundError(`User with id=${id} does not exist`);
    }
  }
}
