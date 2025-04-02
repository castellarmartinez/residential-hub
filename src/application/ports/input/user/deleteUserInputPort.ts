import { DeleteUserUseCase } from "../../../usecases/user/deleteUserUseCase";
import { UserOutputPort } from "../../output/userOutputPort";

export class DeleteUserInputPort implements DeleteUserUseCase {
  constructor(private readonly userRepository: UserOutputPort) {}

  public async execute(id: string): Promise<void> | never {
    return this.userRepository.delete(id);
  }
}
