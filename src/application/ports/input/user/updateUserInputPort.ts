import { User } from "../../../../domain/entities/user";
import { TUser } from "../../../../domain/types/userType";
import { UpdateUserUseCase } from "../../../usecases/user/updateUserUseCase";
import { UserOutputPort } from "../../output/userOutputPort";

export class UpdateUserInputPort implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserOutputPort) {}

  public async execute(
    id: string,
    fieldsToUpdate: TUser
  ): Promise<User> | never {
    return this.userRepository.update(id, fieldsToUpdate);
  }
}
