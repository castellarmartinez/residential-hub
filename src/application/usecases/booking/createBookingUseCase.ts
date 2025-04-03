import { Booking } from "../../../domain/entities/booking";

export interface CreateBookingUseCase {
  execute(
    date: string,
    timeStart: string,
    timeEnd: string,
    userId: string,
    amenityId: string,
    associationId: string
  ): Promise<Booking> | never;
}
