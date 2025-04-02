import { Association } from "../../../domain/entities/association";

export interface UpdateAssociationUseCase {
  execute(
    id: string,
    fieldsToUpdate: Partial<Association>
  ): Promise<Association> | never;
}
