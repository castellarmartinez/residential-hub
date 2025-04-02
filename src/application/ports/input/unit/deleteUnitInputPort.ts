import { DeleteUnitUseCase } from "../../../usecases/unit/deleteUnitUseCase";
import { UnitOutputPort } from "../../output/unitOutputPort";

export class DeleteUnitInputPort implements DeleteUnitUseCase {
  constructor(private readonly unitRepository: UnitOutputPort) {}

  public async execute(id: string): Promise<void> | never {
    return this.unitRepository.delete(id);
  }
}
