import { BookingOutputPort } from "../../../../application/ports/output/bookingOutputPort";
import { Booking } from "../../../../domain/entities/booking";
import { NotFoundError } from "../../../../domain/errors/notFoundError";
import { MongoBooking } from "./mongoBookingModel";

export class MongoBookingRepository implements BookingOutputPort {
  async save(booking: Booking): Promise<void> | never {
    await MongoBooking.create({
      _id: booking.getId(),
      date: booking.getDate(),
      timeStart: booking.getTimeStart(),
      timeEnd: booking.getTimeEnd(),
    });
  }

  async findAll(): Promise<Booking[]> | never {
    return (await MongoBooking.find({})).map(
      (booking) =>
        new Booking(
          booking._id,
          booking.date,
          booking.timeStart,
          booking.timeEnd
        )
    );
  }

  async findById(id: string): Promise<Booking> | never {
    const booking = await MongoBooking.findOne({ _id: id });

    if (booking) {
      return new Booking(
        booking._id,
        booking.date,
        booking.timeStart,
        booking.timeEnd
      );
    }

    throw new NotFoundError(`Booking with id=${id} does not exist`);
  }

  async update(
    id: string,
    fieldsToUpdate: Partial<Booking>
  ): Promise<Booking> | never {
    const updatedBooking = await MongoBooking.findByIdAndUpdate(
      { _id: id },
      { $set: { ...fieldsToUpdate } },
      { new: true }
    );

    if (!updatedBooking) {
      throw new NotFoundError(`Booking with id=${id} does not exist`);
    }

    return new Booking(
      updatedBooking._id,
      updatedBooking.date,
      updatedBooking.timeStart,
      updatedBooking.timeEnd
    );
  }

  async delete(id: string): Promise<void> | never {
    const unit = await MongoBooking.findByIdAndDelete({ _id: id });

    if (!unit) {
      throw new NotFoundError(`Booking with id=${id} does not exist`);
    }
  }
}
