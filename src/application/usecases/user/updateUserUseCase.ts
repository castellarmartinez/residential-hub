import { User } from "../../../domain/entities/user";
import { TUser } from "../../../domain/types/userType";

export interface UpdateUserUseCase {
  execute(id: string, fieldsToUpdate: TUser): Promise<User> | never;
}
