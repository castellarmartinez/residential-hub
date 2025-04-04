import { UnitOutputPort } from "../../../../application/ports/output/unitOutputPort";
import { Unit } from "../../../../domain/entities/unit";
import { NotFoundError } from "../../../../domain/errors/notFoundError";
import { PostgresUnit } from "./postgresUnitModel";
import { PostgresUser } from "./postgresUserModel";

export class PostgresUnitRepository implements UnitOutputPort {
  async save(unit: Unit): Promise<void> {
    const createdUnit = await PostgresUnit.create({
      id: unit.getId(),
      name: unit.getName(),
      associationId: unit.getAssociationId(),
    });

    const users = unit.getUsers();

    if (users && users.length > 0) {
      const existingUsers = await PostgresUser.findAll({
        where: { id: users },
        attributes: ["id"],
      });

      const validUserIds = existingUsers.map((user) => user.getDataValue("id"));
      if (validUserIds.length > 0) {
        await createdUnit.setUsers(validUserIds);
      }
    }
  }

  async findAll(): Promise<Unit[]> | never {
    const units = await PostgresUnit.findAll({
      include: [
        {
          model: PostgresUser,
          as: "users",
          attributes: {
            exclude: ["units", "associations"],
          },
          through: {
            attributes: [],
          },
        },
      ],
    });

    return units.map((unit) => {
      const unitData = unit.toJSON() as any;

      return new Unit(
        unitData.id,
        unitData.name,
        unitData.association ?? undefined,
        unitData.users ?? undefined
      );
    });
  }

  async findById(id: string): Promise<Unit> | never {
    const unit = await PostgresUnit.findOne({
      where: { id },
    });

    if (unit) {
      const unitData = unit.toJSON() as any;

      return new Unit(
        unitData.id,
        unitData.name,
        unitData.association ?? undefined,
        unitData.users ?? undefined
      );
    }

    throw new NotFoundError(`Unit with id=${id} does not exist`);
  }

  async update(
    id: string,
    fieldsToUpdate: Partial<Unit>
  ): Promise<Unit> | never {
    const query = fieldsToUpdate as Record<string, unknown>;
    const { users, ...unitFields } = query;
    let unitData = {} as any;

    if (Object.keys(unitFields).length > 0) {
      const [affectedRows, updatedUnits] = await PostgresUnit.update(query, {
        where: { id },
        returning: true,
      });

      if (affectedRows === 0 || !updatedUnits[0]) {
        throw new NotFoundError(`Unit with id=${id} does not exist`);
      }

      unitData = updatedUnits[0].toJSON();
    }

    return new Unit(unitData.id, unitData.name, unitData.associationId);
  }

  async delete(id: string): Promise<void> | never {
    await PostgresUnit.destroy({ where: { id } });
  }
}
