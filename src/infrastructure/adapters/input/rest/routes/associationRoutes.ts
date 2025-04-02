import express from "express";

import { CreateAssociationInputPort } from "../../../../../application/ports/input/association/createAssociationInputPort";
import { DeleteAssociationInputPort } from "../../../../../application/ports/input/association/deleteAssociationInputPort";
import { GetAssociationByIdInputPort } from "../../../../../application/ports/input/association/getAssociationByIdInputPort";
import { GetAssociationsInputPort } from "../../../../../application/ports/input/association/getAssociationsInputPort";
import { UpdateAssociationInputPort } from "../../../../../application/ports/input/association/updateAssociationInputPort";
import { MongoAssociationRepository } from "../../../output/mongo/mongoAssociationRepository";
import { AssociationController } from "../controllers/associationController";
import { validateId } from "../middlewares/validateParamsId";
import { AssociationMiddleware } from "../middlewares/associationMiddleware";

export const associationRouter = express.Router();

const associationRepository = new MongoAssociationRepository();

const createAssociationUseCase = new CreateAssociationInputPort(
  associationRepository
);
const getAssociationsUseCase = new GetAssociationsInputPort(
  associationRepository
);
const getAssociationByIdUseCase = new GetAssociationByIdInputPort(
  associationRepository
);
const updateAssociationUseCase = new UpdateAssociationInputPort(
  associationRepository
);
const deleteAssociationUseCase = new DeleteAssociationInputPort(
  associationRepository
);

const associationController = new AssociationController(
  createAssociationUseCase,
  getAssociationsUseCase,
  getAssociationByIdUseCase,
  updateAssociationUseCase,
  deleteAssociationUseCase
);

const associationMiddleware = new AssociationMiddleware();

associationRouter.post(
  "/",
  associationMiddleware.validateCreationFields,
  associationController.create
);

associationRouter.get("/", associationController.getAll);

associationRouter.get("/:id", validateId, associationController.getById);

associationRouter.patch(
  "/:id",
  validateId,
  associationMiddleware.validateUpdateFields,
  associationController.update
);

associationRouter.delete("/:id", validateId, associationController.delete);
