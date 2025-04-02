import { Association } from "../../../domain/entities/association";

export interface GetAssociationByIdUseCase {
  execute(id: string): Promise<Association> | never;
}
