import { Association } from "../../../../domain/entities/association";
import { GetAssociationsUseCase } from "../../../usecases/association/getAssociationsUseCase";
import { AssociationOutputPort } from "../../output/associationOutputPort";

export class GetAssociationsInputPort implements GetAssociationsUseCase {
  constructor(private readonly associationRepository: AssociationOutputPort) {}

  public async execute(): Promise<Association[]> | never {
    return this.associationRepository.findAll();
  }
}
