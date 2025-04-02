import { DeleteUserUseCase } from "../../../usecases/user/deleteUserUseCase";
import { AssociationOutputPort } from "../../output/associationOutputPort";

export class DeleteAssociationInputPort implements DeleteUserUseCase {
  constructor(private readonly associationRepository: AssociationOutputPort) {}

  public async execute(id: string): Promise<void> | never {
    return this.associationRepository.delete(id);
  }
}
