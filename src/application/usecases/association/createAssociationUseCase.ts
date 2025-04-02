import { Association } from "../../../domain/entities/association";

export interface CreateAssociationUseCase {
  execute(name: string, address: string): Promise<Association> | never;
}
