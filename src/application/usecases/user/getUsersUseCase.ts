import { User } from "../../../domain/entities/user";

export interface GetUsersUseCase {
  execute(associations?: string): Promise<User[]> | never;
}
