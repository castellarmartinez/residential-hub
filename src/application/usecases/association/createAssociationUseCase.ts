import { Association } from "../../../domain/entities/association";

export interface CreateAssociationUseCase {
  execute(
    name: string,
    address: string,
    units: string[],
    users: string[]
  ): Promise<Association> | never;
}
