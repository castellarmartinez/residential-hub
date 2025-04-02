export interface DeleteAssociationUseCase {
  execute(id: string): Promise<void> | never;
}
