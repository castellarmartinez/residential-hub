import { User } from "../../../../domain/entities/user";
import { UpdateUserUseCase } from "../../../usecases/user/updateUserUseCase";
import { UserOutputPort } from "../../output/userOutputPort";

export class UpdateUserInputPort implements UpdateUserUseCase {
  constructor(private readonly userRepository: UserOutputPort) {}

  public async execute(
    id: string,
    fieldsToUpdate: Partial<User>
  ): Promise<User> | never {
    return this.userRepository.update(id, fieldsToUpdate);
  }
}
