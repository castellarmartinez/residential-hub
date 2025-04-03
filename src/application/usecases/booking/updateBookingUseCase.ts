import { Booking } from "../../../domain/entities/booking";

export interface UpdateBookingUseCase {
  execute(
    id: string,
    fieldsToUpdate: Partial<Booking>
  ): Promise<Booking> | never;
}
