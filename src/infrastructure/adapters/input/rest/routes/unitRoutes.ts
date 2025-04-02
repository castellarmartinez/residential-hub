import express from "express";
import { MongoUnitRepository } from "../../../output/mongo/mongoUnitRepository";
import { validateId } from "../middlewares/validateParamsId";
import { UnitController } from "../controllers/unitController";
import { DeleteUnitInputPort } from "../../../../../application/ports/input/unit/deleteUnitInputPort";
import { GetUnitByIdInputPort } from "../../../../../application/ports/input/unit/getUnitByIdInputPort";
import { GetUnitsInputPort } from "../../../../../application/ports/input/unit/getUnitsInputPort";
import { CreateUnitInputPort } from "../../../../../application/ports/input/unit/createUnitInputPort";
import { UpdateUnitInputPort } from "../../../../../application/ports/input/unit/updateUnitInputPort";
import { UnitMiddleware } from "../middlewares/unitMiddleware";

export const unitRouter = express.Router();

const unitRepository = new MongoUnitRepository();

const createUnitUseCase = new CreateUnitInputPort(unitRepository);
const getUnitsUseCase = new GetUnitsInputPort(unitRepository);
const getUnitByIdUseCase = new GetUnitByIdInputPort(unitRepository);
const updateUnitUseCase = new UpdateUnitInputPort(unitRepository);
const deleteUnitUseCase = new DeleteUnitInputPort(unitRepository);

const unitController = new UnitController(
  createUnitUseCase,
  getUnitsUseCase,
  getUnitByIdUseCase,
  updateUnitUseCase,
  deleteUnitUseCase
);

const unitMiddleware = new UnitMiddleware();

unitRouter.post(
  "/",
  unitMiddleware.validateCreationFields,
  unitController.create
);

unitRouter.get("/", unitController.getAll);

unitRouter.get("/:id", validateId, unitController.getById);

unitRouter.patch(
  "/:id",
  validateId,
  unitMiddleware.validateUpdateFields,
  unitController.update
);

unitRouter.delete("/:id", validateId, unitController.delete);
