import express from "express";
import { CreateAmenityInputPort } from "../../../../../application/ports/input/amenity/createAmenityInputPort";
import { DeleteAmenityInputPort } from "../../../../../application/ports/input/amenity/deleteAmenityInputPort";
import { GetAmenitiesInputPort } from "../../../../../application/ports/input/amenity/getAmenitiesInputPort";
import { GetAmenityByIdInputPort } from "../../../../../application/ports/input/amenity/getAmenityByIdInputPort";
import { UpdateAmenityInputPort } from "../../../../../application/ports/input/amenity/updateAmenityInputPort";
import { MongoAmenityRepository } from "../../../output/mongo/mongoAmenityRepository";
import { validateId } from "../middlewares/validateParamsId";
import { AmenityController } from "../controllers/amenityController";
import { AmenityMiddleware } from "../middlewares/amenityMiddleware";

export const amenityRouter = express.Router();

const amenityRepository = new MongoAmenityRepository();

const createAmenityUseCase = new CreateAmenityInputPort(amenityRepository);
const getAmenitiesUseCase = new GetAmenitiesInputPort(amenityRepository);
const getAmenityByIdUseCase = new GetAmenityByIdInputPort(amenityRepository);
const updateAmenityUseCase = new UpdateAmenityInputPort(amenityRepository);
const deleteAmenityUseCase = new DeleteAmenityInputPort(amenityRepository);

const amenityController = new AmenityController(
  createAmenityUseCase,
  getAmenitiesUseCase,
  getAmenityByIdUseCase,
  updateAmenityUseCase,
  deleteAmenityUseCase
);

const amenityMiddleware = new AmenityMiddleware();

amenityRouter.post(
  "/",
  amenityMiddleware.validateCreationFields,
  amenityController.create
);

amenityRouter.get("/", amenityController.getAll);

amenityRouter.get("/:id", validateId, amenityController.getById);

amenityRouter.patch(
  "/:id",
  validateId,
  amenityMiddleware.validateUpdateFields,
  amenityController.update
);

amenityRouter.delete("/:id", validateId, amenityController.delete);
