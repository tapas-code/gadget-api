import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Gadget, GadgetResponse } from "../types";

const prisma = new PrismaClient();

// ✅ GET: Fetch all gadgets with a random mission success probability
export const getAllGadgets = async (req: Request, res: Response) => {
  try {
    const gadgets: Gadget[] = await prisma.gadget.findMany();

    // Add a random "mission success probability" to each gadget
    const gadgetsWithProbability: GadgetResponse[] = gadgets.map((gadget) => ({
      ...gadget,
      missionSuccessProbability: `${Math.floor(Math.random() * 100)}%`,
    }));

    res.json(gadgetsWithProbability);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

// ✅ POST: Add a new gadget
export const createGadget = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Gadget name is required" });
    }

    const newGadget = await prisma.gadget.create({
      data: { name },
    });

    res.status(201).json(newGadget);
  } catch (error) {
    res.status(500).json({ error: "Failed to create gadget" });
  }
};

// ✅ PATCH: Update a gadget
export const updateGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;

    const updatedGadget = await prisma.gadget.update({
      where: { id },
      data: { name, status },
    });

    res.json(updatedGadget);
  } catch (error) {
    res.status(404).json({ error: "Gadget not found" });
  }
};

// ✅ DELETE: Decommission a gadget instead of deleting
export const deleteGadget = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const decommissionedGadget = await prisma.gadget.update({
      where: { id },
      data: {
        status: "Decommissioned",
        decommissionedAt: new Date(),
      },
    });

    res.json(decommissionedGadget);
  } catch (error) {
    res.status(404).json({ error: "Gadget not found" });
  }
};