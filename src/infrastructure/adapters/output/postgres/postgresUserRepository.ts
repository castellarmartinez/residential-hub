import { UserOutputPort } from "../../../../application/ports/output/userOutputPort";
import { User } from "../../../../domain/entities/user";
import { NotFoundError } from "../../../../domain/errors/notFoundError";
import { PostgresUser } from "./postgresUserModel";

export class PostgresUserRepository implements Partial<UserOutputPort> {
  async save(user: User): Promise<void> {
    await PostgresUser.create({
      id: user.getId(),
      email: user.getEmail(),
      password: user.getPassword(),
      names: user.getNames(),
      lastNames: user.getLastNames(),
    });
  }

  async findAll(): Promise<User[]> | never {
    const users = await PostgresUser.findAll();
    return users.map((user) => {
      const userData = user.toJSON();

      return new User(
        userData.id,
        userData.email,
        userData.password,
        userData.names ?? undefined,
        userData.lastNames ?? undefined
      );
    });
  }

  async findById(id: string): Promise<User> | never {
    const user = await PostgresUser.findOne({ where: { id } });

    if (user) {
      const userData = user.toJSON();

      return new User(
        userData.id,
        userData.email,
        userData.password,
        userData.names ?? undefined,
        userData.lastNames ?? undefined
      );
    }

    throw new NotFoundError(`User with id=${id} does not exist`);
  }

  async update(
    id: string,
    fieldsToUpdate: Partial<User>
  ): Promise<User> | never {
    const query = fieldsToUpdate as Record<string, unknown>;

    const [affectedRows, updatedUsers] = await PostgresUser.update(query, {
      where: { id },
      returning: true,
    });

    if (affectedRows === 0 || !updatedUsers[0]) {
      throw new NotFoundError(`User with id=${id} does not exist`);
    }

    const userData = updatedUsers[0].toJSON();

    return new User(
      userData.id,
      userData.email,
      userData.password,
      userData.names ?? undefined,
      userData.lastNames ?? undefined
    );
  }

  async delete(id: string): Promise<void> | never {
    await PostgresUser.destroy({ where: { id } });
  }
}
