import { Unit } from "../../../domain/entities/unit";

export interface CreateUnitUseCase {
  execute(
    name: string,
    association: string,
    users: string[]
  ): Promise<Unit> | never;
}
