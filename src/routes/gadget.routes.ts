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
router.post("/",authenticateUser, createGadget);
router.patch("/:id", authenticateUser, updateGadget);
router.delete("/:id", authenticateUser, deleteGadget);

// ✅ Step 1: Request self-destruct confirmation code
router.post("/:id/self-destruct/request", authenticateUser, requestSelfDestructCode);

// ✅ Step 2: Confirm the code and self-destruct
router.post("/:id/self-destruct/confirm", authenticateUser, confirmSelfDestruct);

export default router;
