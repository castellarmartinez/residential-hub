import { Amenity } from "../../../../domain/entities/amenity";
import { GetAmenitiesUseCase } from "../../../usecases/amenity/getAmenitiesUseCase";
import { AmenityOutputPort } from "../../output/amenityOutputPort";

export class GetAmenitiesInputPort implements GetAmenitiesUseCase {
  constructor(private readonly amenityRepository: AmenityOutputPort) {}

  public async execute(): Promise<Amenity[]> | never {
    return this.amenityRepository.findAll();
  }
}
