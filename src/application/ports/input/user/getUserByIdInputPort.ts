import { User } from "../../../../domain/entities/user";
import { GetUserByIdUseCase } from "../../../usecases/user/getUserByIdUseCase";
import { UserOutputPort } from "../../output/userOutputPort";

export class GetUserByIdInputPort implements GetUserByIdUseCase {
  constructor(private readonly userRepository: UserOutputPort) {}

  public async execute(id: string): Promise<User> | never {
    return this.userRepository.findById(id);
  }
}
