import { v4 as uuidv4 } from "uuid";

import { Amenity } from "../../../../domain/entities/amenity";
import { CreateAmenityUseCase } from "../../../usecases/amenity/createAmenityUseCase";
import { AmenityOutputPort } from "../../output/amenityOutputPort";

export class CreateAmenityInputPort implements CreateAmenityUseCase {
  constructor(private readonly amenityRepository: AmenityOutputPort) {}

  public async execute(
    name: string,
    description: string,
    bookable: boolean,
    openingTime: string,
    closingTime: string,
    association: string
  ): Promise<Amenity> | never {
    const amenity = new Amenity(
      uuidv4(),
      name,
      description,
      bookable,
      openingTime,
      closingTime,
      association
    );
    await this.amenityRepository.save(amenity);

    return amenity;
  }
}
