import express from "express";

import { CreateAssociationInputPort } from "../../../../../application/ports/input/association/createAssociationInputPort";
import { DeleteAssociationInputPort } from "../../../../../application/ports/input/association/deleteAssociationInputPort";
import { GetAssociationByIdInputPort } from "../../../../../application/ports/input/association/getAssociationByIdInputPort";
import { GetAssociationsInputPort } from "../../../../../application/ports/input/association/getAssociationsInputPort";
import { UpdateAssociationInputPort } from "../../../../../application/ports/input/association/updateAssociationInputPort";
import { MongoAssociationRepository } from "../../../output/mongo/mongoAssociationRepository";
import { AssociationController } from "../controllers/associationController";
import { validateAssociationFieldsForCreation } from "../middlewares/validateAssociationFieldsForCreation";
import { validateAssociationFieldsForUpdate } from "../middlewares/validateAssociationFieldsForUpdate";
import { validateId } from "../middlewares/validateId";

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

associationRouter.post(
  "/",
  validateAssociationFieldsForCreation,
  associationController.create
);
associationRouter.get("/", associationController.getAll);
associationRouter.get("/:id", validateId, associationController.getById);
associationRouter.patch(
  "/:id",
  validateId,
  validateAssociationFieldsForUpdate,
  associationController.update
);
associationRouter.delete("/:id", validateId, associationController.delete);
