import { AmenityOutputPort } from "../../../../application/ports/output/amenityOutputPort";
import { Amenity } from "../../../../domain/entities/amenity";
import { NotFoundError } from "../../../../domain/errors/notFoundError";
import { MongoAmenity } from "./mongoAmenityModel";

export class MongoAmenityRepository implements AmenityOutputPort {
  async save(amenity: Amenity): Promise<void> | never {
    await MongoAmenity.create({
      _id: amenity.getId(),
      name: amenity.getName(),
      description: amenity.getDescription(),
      bookable: amenity.getBookable(),
      openingTime: amenity.getOpeningTime(),
      closingTime: amenity.getClosingTime(),
      associationId: amenity.getAssociationId(),
    });
  }

  async findAll(): Promise<Amenity[]> | never {
    return (await MongoAmenity.find({})).map(
      (amenity) =>
        new Amenity(
          amenity._id,
          amenity.name,
          amenity.description,
          amenity.bookable,
          amenity.openingTime,
          amenity.closingTime,
          amenity.associationId
        )
    );
  }

  async findById(id: string): Promise<Amenity> | never {
    const amenity = await MongoAmenity.findOne({ _id: id });

    if (amenity) {
      return new Amenity(
        amenity._id,
        amenity.name,
        amenity.description,
        amenity.bookable,
        amenity.openingTime,
        amenity.closingTime,
        amenity.associationId
      );
    }

    throw new NotFoundError(`Amenity with id=${id} does not exist`);
  }

  async update(
    id: string,
    fieldsToUpdate: Partial<Amenity>
  ): Promise<Amenity> | never {
    const updatedAmenity = await MongoAmenity.findByIdAndUpdate(
      { _id: id },
      { $set: { ...fieldsToUpdate } },
      { new: true }
    );

    if (!updatedAmenity) {
      throw new NotFoundError(`Amenity with id=${id} does not exist`);
    }

    return new Amenity(
      updatedAmenity._id,
      updatedAmenity.name,
      updatedAmenity.description,
      updatedAmenity.bookable,
      updatedAmenity.openingTime,
      updatedAmenity.closingTime,
      updatedAmenity.associationId
    );
  }

  async delete(id: string): Promise<void> | never {
    const amenity = await MongoAmenity.findByIdAndDelete({ _id: id });

    if (!amenity) {
      throw new NotFoundError(`Amenity with id=${id} does not exist`);
    }
  }
}
