import { Unit } from "../../../domain/entities/unit";

export interface GetUnitsUseCase {
  execute(association?: string): Promise<Unit[]> | never;
}
