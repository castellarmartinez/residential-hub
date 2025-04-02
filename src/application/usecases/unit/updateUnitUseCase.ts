import { Unit } from "../../../domain/entities/unit";

export interface UpdateUnitUseCase {
  execute(id: string, fieldsToUpdate: Partial<Unit>): Promise<Unit> | never;
}
