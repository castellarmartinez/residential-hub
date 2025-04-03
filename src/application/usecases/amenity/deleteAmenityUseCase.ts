export interface DeleteAmenityUseCase {
  execute(id: string): Promise<void> | never;
}
