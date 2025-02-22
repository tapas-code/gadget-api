import { Request } from "express";

export type GadgetStatus =
  | "Available"
  | "Deployed"
  | "Destroyed"
  | "Decommissioned";

export interface Gadget {
  id: string;
  name: string;
  status: GadgetStatus;
  createdAt: Date;
  updatedAt: Date;
  decommissionedAt?: Date | null;
}

export interface GadgetResponse extends Gadget {
  missionSuccessProbability?: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}
