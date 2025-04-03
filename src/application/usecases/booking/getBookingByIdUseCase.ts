import { Booking } from "../../../domain/entities/booking";

export interface GetBookingByIdUseCase {
  execute(id: string): Promise<Booking> | never;
}
