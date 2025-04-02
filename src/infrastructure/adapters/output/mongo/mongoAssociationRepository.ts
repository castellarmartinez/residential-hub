import { AssociationOutputPort } from "../../../../application/ports/output/associationOutputPort";
import { Association } from "../../../../domain/entities/association";
import { NotFoundError } from "../../../../domain/errors/notFoundError";
import { TAssociation } from "../../../../domain/types/associationType";
import { MongoAssociation } from "./mongoAssociationModel";

export class MongoAssociationRepository implements AssociationOutputPort {
  async save(association: Association): Promise<void> | never {
    MongoAssociation.create({
      _id: association.getId(),
      name: association.getName(),
      address: association.getAddress(),
    });
  }

  async findAll(): Promise<Association[]> | never {
    return (await MongoAssociation.find({})).map(
      (association) =>
        new Association(association._id, association.name, association.address)
    );
  }

  async findById(id: string): Promise<Association> | never {
    const association = await MongoAssociation.findOne({ _id: id });

    if (association) {
      return new Association(
        association._id,
        association.name,
        association.address
      );
    }

    throw new NotFoundError(`User with id=${id} does not exist`);
  }

  async update(
    id: string,
    fieldsToUpdate: TAssociation
  ): Promise<Association> | never {
    const updatedAssociation = await MongoAssociation.findByIdAndUpdate(
      { _id: id },
      { $set: { ...fieldsToUpdate } },
      { new: true }
    );

    if (!updatedAssociation) {
      throw new NotFoundError(`User with id=${id} does not exist`);
    }

    return new Association(
      updatedAssociation._id,
      updatedAssociation.name,
      updatedAssociation.address
    );
  }

  async delete(id: string): Promise<void> | never {
    const association = await MongoAssociation.findByIdAndDelete({ _id: id });

    if (!association) {
      throw new NotFoundError(`User with id=${id} does not exist`);
    }
  }
}
