import { Unit } from "../../../domain/entities/unit";

export interface UnitOutputPort {
  save(unit: Unit): Promise<void> | never;
  findAll(): Promise<Unit[]> | never;
  findById(id: string): Promise<Unit> | never;
  update(id: string, fieldsToUpdate: Partial<Unit>): Promise<Unit> | never;
  delete(id: string): Promise<void> | never;
}
