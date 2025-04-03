import { Amenity } from "../../../../domain/entities/amenity";
import { GetAmenityByIdUseCase } from "../../../usecases/amenity/getAmenityByIdUseCase";
import { AmenityOutputPort } from "../../output/amenityOutputPort";

export class GetAmenityByIdInputPort implements GetAmenityByIdUseCase {
  constructor(private readonly amenityRepository: AmenityOutputPort) {}

  public async execute(id: string): Promise<Amenity> | never {
    return this.amenityRepository.findById(id);
  }
}
