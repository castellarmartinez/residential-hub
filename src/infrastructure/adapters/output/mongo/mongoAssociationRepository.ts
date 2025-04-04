import { AssociationOutputPort } from "../../../../application/ports/output/associationOutputPort";
import { Association } from "../../../../domain/entities/association";
import { NotFoundError } from "../../../../domain/errors/notFoundError";
import { MongoAssociation } from "./mongoAssociationModel";

export class MongoAssociationRepository implements AssociationOutputPort {
  async save(association: Association): Promise<void> | never {
    await MongoAssociation.create({
      _id: association.getId(),
      name: association.getName(),
      address: association.getAddress(),
      units: association.getUnits(),
      users: association.getUsers(),
    });
  }

  async findAll(): Promise<Association[]> | never {
    const associations = await MongoAssociation.find({})
      .populate({ path: "users", select: "-units -associations -__v" })
      .populate({ path: "units", select: "-associationId -users -__v" });

    return associations.map(
      (association) =>
        new Association(
          association._id,
          association.name,
          association.address,
          association.units,
          association.users
        )
    );
  }

  async findById(id: string): Promise<Association> | never {
    const association = await MongoAssociation.findOne({ _id: id })
      .populate({ path: "users", select: "-units -associations -__v" })
      .populate({ path: "units", select: "-associationId -users -__v" });

    if (association) {
      return new Association(
        association._id,
        association.name,
        association.address,
        association.units,
        association.users
      );
    }

    throw new NotFoundError(`Association with id=${id} does not exist`);
  }

  async update(
    id: string,
    fieldsToUpdate: Partial<Association>
  ): Promise<Association> | never {
    const updatedAssociation = await MongoAssociation.findByIdAndUpdate(
      { _id: id },
      { $set: { ...fieldsToUpdate } },
      { new: true }
    );

    if (!updatedAssociation) {
      throw new NotFoundError(`Association with id=${id} does not exist`);
    }

    return new Association(
      updatedAssociation._id,
      updatedAssociation.name,
      updatedAssociation.address,
      updatedAssociation.units,
      updatedAssociation.users
    );
  }

  async delete(id: string): Promise<void> | never {
    const association = await MongoAssociation.findByIdAndDelete({ _id: id })
      .populate({ path: "users", select: "-units -associations -__v" })
      .populate({ path: "units", select: "-associationId -users -__v" });

    if (!association) {
      throw new NotFoundError(`Association with id=${id} does not exist`);
    }
  }
}
