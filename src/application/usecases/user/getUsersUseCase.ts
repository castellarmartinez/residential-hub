import { User } from "../../../domain/entities/user";

export interface GetUsersUseCase {
  execute(): Promise<User[]> | never;
}
