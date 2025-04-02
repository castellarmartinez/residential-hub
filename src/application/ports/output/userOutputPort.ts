import { User } from "../../../domain/entities/user";

export interface UserOutputPort {
  save(user: User): Promise<void> | never;
  findAll(): Promise<User[]> | never;
  findById(id: string): Promise<User> | never;
  update(id: string, fieldsToUpdate: Partial<User>): Promise<User> | never;
  delete(id: string): Promise<void> | never;
}
