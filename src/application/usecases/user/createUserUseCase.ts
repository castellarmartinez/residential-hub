import { User } from "../../../domain/entities/user";

export interface CreateUserUseCase {
  execute(
    email: string,
    password: string,
    names: string,
    lastNames: string
  ): Promise<User> | never;
}
