import { v4 as uuidv4 } from "uuid";

import { Unit } from "../../../../domain/entities/unit";
import { CreateUnitUseCase } from "../../../usecases/unit/createUnitUseCase";
import { UnitOutputPort } from "../../output/unitOutputPort";

export class CreateUnitInputPort implements CreateUnitUseCase {
  constructor(private readonly unitRepository: UnitOutputPort) {}

  public async execute(
    name: string,
    association: string,
    users: string[]
  ): Promise<Unit> | never {
    const unit = new Unit(uuidv4(), name, association, users);
    await this.unitRepository.save(unit);

    return unit;
  }
}
