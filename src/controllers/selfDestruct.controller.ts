import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import redisClient from "../config/redis";

const prisma = new PrismaClient();

const SELF_DESTRUCT_EXPIRY = 300; // Code expires in 5 minutes

// ✅ Step 1: Generate a self-destruct confirmation code
export const requestSelfDestructCode = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;

    // Check if gadget exists
    const gadget = await prisma.gadget.findUnique({ where: { id } });
    if (!gadget) {
      return res.status(404).json({ error: "Gadget not found" });
    }

    const confirmationCode = Math.floor(100000 + Math.random() * 900000);

    const redisKey = `self-destruct:${id}`;
    console.log(`🔑 Storing Code in Redis at Key: ${redisKey}`);
    
    await redisClient.set(redisKey, confirmationCode.toString(), { EX: SELF_DESTRUCT_EXPIRY });
    
    const storedCode = await redisClient.get(redisKey);
    console.log(`🗄️ Retrieved Code from Redis: ${storedCode}`);

    res.json({
      message: "Self-destruct confirmation code generated.",
      confirmationCode,
      expiresIn: SELF_DESTRUCT_EXPIRY,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate self-destruct code", error });
  }
};

// ✅ Step 2: Confirm the self-destruct code and destroy the gadget
export const confirmSelfDestruct = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { id } = req.params;
    const { confirmationCode } = req.body;

    if (!confirmationCode) {
      return res.status(400).json({ error: "Confirmation code is required" });
    }

    const redisKey = `self-destruct:${id}`;
    console.log(`🔑 Fetching Code from Redis at Key: ${redisKey}`);
    
    const storedCode = await redisClient.get(redisKey);
    console.log(`🗄️ Stored Code: ${storedCode}, Received Code: ${confirmationCode}`);

    if (!storedCode) {
      return res
        .status(400)
        .json({ error: "Invalid or expired confirmation code" });
    }

    if (storedCode !== confirmationCode.toString()) {
      return res.status(401).json({ error: "Incorrect confirmation code" });
    }

    // Mark gadget as "Destroyed"
    const destroyedGadget = await prisma.gadget.update({
      where: { id },
      data: { status: "Destroyed" },
    });

    // Remove the confirmation code from Redis (no longer needed)
    await redisClient.del(`self-destruct:${id}`);

    res.json({
      message: "Self-destruct sequence confirmed! Gadget destroyed.",
      gadget: destroyedGadget,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to confirm self-destruct sequence" });
  }
};
