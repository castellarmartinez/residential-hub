import { AssociationOutputPort } from "../../../../application/ports/output/associationOutputPort";
import { Association } from "../../../../domain/entities/association";
import { NotFoundError } from "../../../../domain/errors/notFoundError";
import { PostgresAssociation } from "./postgresAssociationModel";

export class PostgresAssociationRepository implements AssociationOutputPort {
  async save(association: Association): Promise<void> {
    await PostgresAssociation.create({
      id: association.getId(),
      name: association.getName(),
      address: association.getAddress(),
    });
  }

  async findAll(): Promise<Association[]> | never {
    const associations = await PostgresAssociation.findAll();
    return associations.map((association) => {
      const associationData = association.toJSON();

      return new Association(
        associationData.id,
        associationData.name,
        associationData.address
      );
    });
  }

  async findById(id: string): Promise<Association> | never {
    const association = await PostgresAssociation.findOne({ where: { id } });

    if (association) {
      const associationData = association.toJSON();

      return new Association(
        associationData.id,
        associationData.name,
        associationData.address
      );
    }

    throw new NotFoundError(`Association with id=${id} does not exist`);
  }

  async update(
    id: string,
    fieldsToUpdate: Partial<Association>
  ): Promise<Association> | never {
    const query = fieldsToUpdate as Record<string, unknown>;

    const [affectedRows, updatedAssociations] =
      await PostgresAssociation.update(query, {
        where: { id },
        returning: true,
      });

    if (affectedRows === 0 || !updatedAssociations[0]) {
      throw new NotFoundError(`Association with id=${id} does not exist`);
    }

    const associationData = updatedAssociations[0].toJSON();

    return new Association(
      associationData.id,
      associationData.name,
      associationData.address
    );
  }

  async delete(id: string): Promise<void> | never {
    await PostgresAssociation.destroy({ where: { id } });
  }
}
