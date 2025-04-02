import { Association } from "../../../domain/entities/association";

export interface GetAssociationsUseCase {
  execute(): Promise<Association[]> | never;
}
