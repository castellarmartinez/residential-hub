import { UnitOutputPort } from "../../../../application/ports/output/unitOutputPort";
import { Unit } from "../../../../domain/entities/unit";
import { NotFoundError } from "../../../../domain/errors/notFoundError";
import { PostgresUnit } from "./postgresUnitModel";

export class PostgresUnitRepository implements UnitOutputPort {
  async save(unit: Unit): Promise<void> {
    await PostgresUnit.create({
      id: unit.getId(),
      name: unit.getName(),
    });
  }

  async findAll(): Promise<Unit[]> | never {
    const units = await PostgresUnit.findAll();
    return units.map((unit) => {
      const unitData = unit.toJSON();

      return new Unit(unitData.id, unitData.name);
    });
  }

  async findById(id: string): Promise<Unit> | never {
    const unit = await PostgresUnit.findOne({ where: { id } });

    if (unit) {
      const unitData = unit.toJSON();

      return new Unit(unitData.id, unitData.name);
    }

    throw new NotFoundError(`Unit with id=${id} does not exist`);
  }

  async update(
    id: string,
    fieldsToUpdate: Partial<Unit>
  ): Promise<Unit> | never {
    const query = fieldsToUpdate as Record<string, unknown>;

    const [affectedRows, updatedUnits] = await PostgresUnit.update(query, {
      where: { id },
      returning: true,
    });

    if (affectedRows === 0 || !updatedUnits[0]) {
      throw new NotFoundError(`Unit with id=${id} does not exist`);
    }

    const unitData = updatedUnits[0].toJSON();

    return new Unit(unitData.id, unitData.name);
  }

  async delete(id: string): Promise<void> | never {
    await PostgresUnit.destroy({ where: { id } });
  }
}
