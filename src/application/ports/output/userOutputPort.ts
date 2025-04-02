import { User } from "../../../domain/entities/user";

export interface UserOutputPort {
  save(user: User): Promise<void> | never;
  findAll(): Promise<User[]> | never;
}
