import { Booking } from "../../../domain/entities/booking";

export interface GetBookingsUseCase {
  execute(association?: string): Promise<Booking[]> | never;
}
