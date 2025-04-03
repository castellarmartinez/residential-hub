export interface DeleteBookingUseCase {
  execute(id: string): Promise<void> | never;
}
