import { Unit } from "../../../../domain/entities/unit";
import { UpdateUnitUseCase } from "../../../usecases/unit/updateUnitUseCase";
import { UnitOutputPort } from "../../output/unitOutputPort";

export class UpdateUnitInputPort implements UpdateUnitUseCase {
  constructor(private readonly unitRepository: UnitOutputPort) {}

  public async execute(
    id: string,
    fieldsToUpdate: Partial<Unit>
  ): Promise<Unit> | never {
    return this.unitRepository.update(id, fieldsToUpdate);
  }
}
