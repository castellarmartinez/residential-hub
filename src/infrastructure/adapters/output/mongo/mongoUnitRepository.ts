import { UnitOutputPort } from "../../../../application/ports/output/unitOutputPort";
import { Unit } from "../../../../domain/entities/unit";
import { NotFoundError } from "../../../../domain/errors/notFoundError";
import { MongoUnit } from "./mongoUnitModel";

export class MongoUnitRepository implements UnitOutputPort {
  async save(unit: Unit): Promise<void> | never {
    MongoUnit.create({
      _id: unit.getId(),
      name: unit.getName(),
      associationId: unit.getAssociationId(),
      users: unit.getUsers(),
    });
  }

  async findAll(): Promise<Unit[]> | never {
    return (await MongoUnit.find({})).map(
      (unit) => new Unit(unit._id, unit.name, unit.associationId, unit.users)
    );
  }

  async findById(id: string): Promise<Unit> | never {
    const unit = await MongoUnit.findOne({ _id: id });

    if (unit) {
      return new Unit(unit._id, unit.name, unit.associationId, unit.users);
    }

    throw new NotFoundError(`User with id=${id} does not exist`);
  }

  async update(
    id: string,
    fieldsToUpdate: Partial<Unit>
  ): Promise<Unit> | never {
    const updatedUnit = await MongoUnit.findByIdAndUpdate(
      { _id: id },
      { $set: { ...fieldsToUpdate } },
      { new: true }
    );

    if (!updatedUnit) {
      throw new NotFoundError(`User with id=${id} does not exist`);
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
      throw new NotFoundError(`User with id=${id} does not exist`);
    }
  }
}
