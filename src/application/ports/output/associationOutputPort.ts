import { Association } from "../../../domain/entities/association";

export interface AssociationOutputPort {
  save(association: Association): Promise<void> | never;
  findAll(): Promise<Association[]> | never;
  findById(id: string): Promise<Association> | never;
  update(
    id: string,
    fieldsToUpdate: Partial<Association>
  ): Promise<Association> | never;
  delete(id: string): Promise<void> | never;
}
