import { Booking } from "../../../domain/entities/booking";

export interface CreateBookingUseCase {
  execute(
    date: string,
    timeStart: string,
    timeEnd: string
  ): Promise<Booking> | never;
}
