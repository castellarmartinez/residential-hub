import { Association } from "../../../domain/entities/association";
import { TAssociation } from "../../../domain/types/associationType";

export interface AssociationOutputPort {
  save(user: Association): Promise<void> | never;
  findAll(): Promise<Association[]> | never;
  findById(id: string): Promise<Association> | never;
  update(
    id: string,
    fieldsToUpdate: TAssociation
  ): Promise<Association> | never;
  delete(id: string): Promise<void> | never;
}
