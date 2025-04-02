export interface DeleteUnitUseCase {
  execute(id: string): Promise<void> | never;
}
