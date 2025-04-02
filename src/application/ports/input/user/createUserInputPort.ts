import { v4 as uuidv4 } from "uuid";

import { User } from "../../../../domain/entities/user";
import { CreateUserUseCase } from "../../../usecases/user/createUserUseCase";
import { UserOutputPort } from "../../output/userOutputPort";

export class CreateUserInputPort implements CreateUserUseCase {
  constructor(private readonly userRepository: UserOutputPort) {}

  public async execute(
    email: string,
    password: string,
    names: string,
    lastNames: string
  ): Promise<User> | never {
    const user = new User(uuidv4(), email, password, lastNames, names);
    await this.userRepository.save(user);

    return user;
  }
}
