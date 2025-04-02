import { User } from "../../../domain/entities/user";

export interface GetUserByIdUseCase {
  execute(id: string): Promise<User> | never;
}
