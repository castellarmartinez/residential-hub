import { v4 as uuidv4 } from "uuid";

import { Association } from "../../../../domain/entities/association";
import { CreateAssociationUseCase } from "../../../usecases/association/createAssociationUseCase";
import { AssociationOutputPort } from "../../output/associationOutputPort";

export class CreateAssociationInputPort implements CreateAssociationUseCase {
  constructor(private readonly associationRepository: AssociationOutputPort) {}

  public async execute(
    name: string,
    address: string
  ): Promise<Association> | never {
    const user = new Association(uuidv4(), name, address);
    await this.associationRepository.save(user);

    return user;
  }
}
