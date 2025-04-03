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
      amenityId: booking.getAmenity(),
      userId: booking.getUserId(),
      associationId: booking.getAssociationId(),
    });
  }

  async findAll(): Promise<Booking[]> | never {
    const bookings = await MongoBooking.find({})
      .populate({ path: "userId", select: "-units -associations -__v" })
      .populate({ path: "amenityId", select: "-associationId -__v" })
      .populate({ path: "associationId", select: "-units -users -__v" });

    return bookings.map(
      (booking) =>
        new Booking(
          booking._id,
          booking.date,
          booking.timeStart,
          booking.timeEnd,
          booking.userId,
          booking.amenityId,
          booking.associationId
        )
    );
  }

  async findById(id: string): Promise<Booking> | never {
    const booking = await MongoBooking.findOne({ _id: id })
      .populate({ path: "userId", select: "-units -associations -__v" })
      .populate({ path: "amenityId", select: "-associationId -__v" })
      .populate({ path: "associationId", select: "-units -users -__v" });

    if (booking) {
      return new Booking(
        booking._id,
        booking.date,
        booking.timeStart,
        booking.timeEnd,
        booking.userId,
        booking.amenityId,
        booking.associationId
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
    )
      .populate({ path: "userId", select: "-units -associations -__v" })
      .populate({ path: "amenityId", select: "-associationId -__v" })
      .populate({ path: "associationId", select: "-units -users -__v" });

    if (!updatedBooking) {
      throw new NotFoundError(`Booking with id=${id} does not exist`);
    }

    return new Booking(
      updatedBooking._id,
      updatedBooking.date,
      updatedBooking.timeStart,
      updatedBooking.timeEnd,
      updatedBooking.userId,
      updatedBooking.amenityId,
      updatedBooking.associationId
    );
  }

  async delete(id: string): Promise<void> | never {
    const unit = await MongoBooking.findByIdAndDelete({ _id: id });

    if (!unit) {
      throw new NotFoundError(`Booking with id=${id} does not exist`);
    }
  }
}
