import { Unit } from "../../../../domain/entities/unit";
import { GetUnitByIdUseCase } from "../../../usecases/unit/getUnitByIdUseCase";
import { UnitOutputPort } from "../../output/unitOutputPort";

export class GetUnitByIdInputPort implements GetUnitByIdUseCase {
  constructor(private readonly unitRepository: UnitOutputPort) {}

  public async execute(id: string): Promise<Unit> | never {
    return this.unitRepository.findById(id);
  }
}
