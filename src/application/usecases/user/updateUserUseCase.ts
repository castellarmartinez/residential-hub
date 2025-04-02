import { User } from "../../../domain/entities/user";

export interface UpdateUserUseCase {
  execute(id: string, fieldsToUpdate: Partial<User>): Promise<User> | never;
}
