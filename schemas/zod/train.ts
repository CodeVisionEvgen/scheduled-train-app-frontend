import { z } from "zod";

export const trainSchema = z
  .object({
    number: z.string().min(1, "Number is required"),
    from: z.string().min(1, "From is required"),
    to: z.string().min(1, "To is required"),
    departure: z.string("Invalid departure date"),
    arrival: z.string("Invalid arrival date"),
  })
  .refine(
    (data) => {
      const dep = new Date(data.departure);
      const arr = new Date(data.arrival);
      return arr > dep;
    },
    {
      message: "Arrival time must be after departure time",
      path: ["arrival"],
    },
  );
