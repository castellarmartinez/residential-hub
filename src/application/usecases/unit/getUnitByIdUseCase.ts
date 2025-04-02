import { Unit } from "../../../domain/entities/unit";

export interface GetUnitByIdUseCase {
  execute(id: string): Promise<Unit> | never;
}
