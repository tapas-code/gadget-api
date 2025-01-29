import express, { Router } from "express";
import { createGadget, deleteGadget, getAllGadgets, updateGadget } from "../controllers/gadget.controller";

const router: Router = express.Router();

router.get('/', getAllGadgets);
router.get('/', createGadget);
router.get('/:id', updateGadget);
router.get('/:id', deleteGadget);

export default router;
