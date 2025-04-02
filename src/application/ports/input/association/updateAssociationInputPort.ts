import { Association } from "../../../../domain/entities/association";
import { UpdateAssociationUseCase } from "../../../usecases/association/updateAssociationUseCase";
import { AssociationOutputPort } from "../../output/associationOutputPort";

export class UpdateAssociationInputPort implements UpdateAssociationUseCase {
  constructor(private readonly associationRepository: AssociationOutputPort) {}

  public async execute(
    id: string,
    fieldsToUpdate: Partial<Association>
  ): Promise<Association> | never {
    return this.associationRepository.update(id, fieldsToUpdate);
  }
}
