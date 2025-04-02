import { User } from "../../../../domain/entities/user";
import { GetUsersUseCase } from "../../../usecases/user/getUsersUseCase";
import { UserOutputPort } from "../../output/userOutputPort";

export class GetUsersInputPort implements GetUsersUseCase {
  constructor(private readonly userRepository: UserOutputPort) {}

  public async execute(): Promise<User[]> | never {
    return this.userRepository.findAll();
  }
}
