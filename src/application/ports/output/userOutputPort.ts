import { User } from "../../../domain/entities/user";
import { TUser } from "../../../domain/types/userType";

export interface UserOutputPort {
  save(user: User): Promise<void> | never;
  findAll(): Promise<User[]> | never;
  findById(id: string): Promise<User> | never;
  update(id: string, fieldsToUpdate: TUser): Promise<User> | never;
}
