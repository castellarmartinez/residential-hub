import { UnitOutputPort } from "../../../../application/ports/output/unitOutputPort";
import { Unit } from "../../../../domain/entities/unit";
import { NotFoundError } from "../../../../domain/errors/notFoundError";
import { MongoUnit } from "./mongoUnitModel";

export class MongoUnitRepository implements UnitOutputPort {
  async save(unit: Unit): Promise<void> | never {
    await MongoUnit.create({
      _id: unit.getId(),
      name: unit.getName(),
      associationId: unit.getAssociationId(),
      users: unit.getUsers(),
    });
  }

  async findAll(associationId?: string): Promise<Unit[]> | never {
    const query = associationId ? { associationId } : {};
    const units = await MongoUnit.find(query)
      .populate({ path: "users", select: "-units -associations -__v" })
      .populate({ path: "associationId", select: "-units -users -__v" });

    return units.map(
      (unit) => new Unit(unit._id, unit.name, unit.associationId, unit.users)
    );
  }

  async findById(id: string): Promise<Unit> | never {
    const unit = await MongoUnit.findOne({ _id: id })
      .populate({ path: "users", select: "-units -associations -__v" })
      .populate({ path: "associationId", select: "-units -users -__v" });

    if (unit) {
      return new Unit(unit._id, unit.name, unit.associationId, unit.users);
    }

    throw new NotFoundError(`Unit with id=${id} does not exist`);
  }

  async update(
    id: string,
    fieldsToUpdate: Partial<Unit>
  ): Promise<Unit> | never {
    const updatedUnit = await MongoUnit.findByIdAndUpdate(
      { _id: id },
      { $set: { ...fieldsToUpdate } },
      { new: true }
    )
      .populate({ path: "users", select: "-units -associations -__v" })
      .populate({ path: "associationId", select: "-units -users -__v" });

    if (!updatedUnit) {
      throw new NotFoundError(`Unit with id=${id} does not exist`);
    }

    return new Unit(
      updatedUnit._id,
      updatedUnit.name,
      updatedUnit.associationId,
      updatedUnit.users
    );
  }

  async delete(id: string): Promise<void> | never {
    const unit = await MongoUnit.findByIdAndDelete({ _id: id });

    if (!unit) {
      throw new NotFoundError(`Unit with id=${id} does not exist`);
    }
  }
}
