import express, { Router } from "express";
import {
  createGadget,
  deleteGadget,
  getAllGadgets,
  updateGadget,
} from "../controllers/gadget.controller";
import {
  requestSelfDestructCode,
  confirmSelfDestruct,
} from "../controllers/selfDestruct.controller";
import { authenticateUser } from "../middlewares/authMiddleware";

const router: Router = express.Router();

router.get("/", authenticateUser, getAllGadgets);
router.get("/",authenticateUser, createGadget);
router.get("/:id", updateGadget);
router.get("/:id", deleteGadget);

// ✅ Step 1: Request self-destruct confirmation code
router.post("/:id/self-destruct/request", requestSelfDestructCode);

// ✅ Step 2: Confirm the code and self-destruct
router.post("/:id/self-destruct/confirm", confirmSelfDestruct);

export default router;
