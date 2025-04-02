import { Association } from "../../../../domain/entities/association";
import { GetAssociationByIdUseCase } from "../../../usecases/association/getAssociationByIdUseCase";
import { AssociationOutputPort } from "../../output/associationOutputPort";

export class GetAssociationByIdInputPort implements GetAssociationByIdUseCase {
  constructor(private readonly associationRepository: AssociationOutputPort) {}

  public async execute(id: string): Promise<Association> | never {
    return this.associationRepository.findById(id);
  }
}
