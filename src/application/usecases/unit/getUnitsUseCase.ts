import { Unit } from "../../../domain/entities/unit";

export interface GetUnitsUseCase {
  execute(): Promise<Unit[]> | never;
}
