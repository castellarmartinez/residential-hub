import { DeleteUnitUseCase as DeleteAmenityUseCase } from "../../../usecases/unit/deleteUnitUseCase";
import { AmenityOutputPort } from "../../output/amenityOutputPort";

export class DeleteAmenityInputPort implements DeleteAmenityUseCase {
  constructor(private readonly amenityRepository: AmenityOutputPort) {}

  public async execute(id: string): Promise<void> | never {
    return this.amenityRepository.delete(id);
  }
}
