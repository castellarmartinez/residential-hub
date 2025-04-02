import { Association } from "../../../domain/entities/association";
import { TAssociation } from "../../../domain/types/associationType";

export interface UpdateAssociationUseCase {
  execute(
    id: string,
    fieldsToUpdate: TAssociation
  ): Promise<Association> | never;
}
