import { Unit } from "../../../../domain/entities/unit";
import { GetUnitsUseCase } from "../../../usecases/unit/getUnitsUseCase";
import { UnitOutputPort } from "../../output/unitOutputPort";

export class GetUnitsInputPort implements GetUnitsUseCase {
  constructor(private readonly unitRepository: UnitOutputPort) {}

  public async execute(association?: string): Promise<Unit[]> | never {
    return this.unitRepository.findAll(association);
  }
}
