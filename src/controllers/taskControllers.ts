import { Request, Response } from "express";

export const taskControllers = {
  read(_req: Request, res: Response) {
    return res.status(200).json({
      reports: {
        sale1: "10000",
        sale2: "20000",
        sale3: "30000",
      },
    });
  },
};
