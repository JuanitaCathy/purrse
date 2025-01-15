import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { differenceInDays } from "date-fns";
import { z } from "zod";

export const OverviewQuerySchema = z
  .object({
    from: z.coerce.date(),
    to: z.coerce.date(),
  })
  .refine((values) => {
    const { from, to } = values;
    const days = differenceInDays(to, from);
    const isValidRange = days >= 0 && days <= MAX_DATE_RANGE_DAYS;
    return isValidRange;
  }, {
    message: `Date range must be between 0 and ${MAX_DATE_RANGE_DAYS} days.`, // Custom error message
  });
