import { Amenity } from "../../../../domain/entities/amenity";
import { UpdateAmenityUseCase } from "../../../usecases/amenity/updateAmenityUseCase";
import { AmenityOutputPort } from "../../output/amenityOutputPort";

export class UpdateAmenityInputPort implements UpdateAmenityUseCase {
  constructor(private readonly amenityRepository: AmenityOutputPort) {}

  public async execute(
    id: string,
    fieldsToUpdate: Partial<Amenity>
  ): Promise<Amenity> | never {
    return this.amenityRepository.update(id, fieldsToUpdate);
  }
}
