"use client";

import { DateRangePicker } from "@/components/ui/date-range-picker";
import { MAX_DATE_RANGE_DAYS } from "@/lib/constants";
import { UserSettings } from "@prisma/client";
import { differenceInDays, startOfMonth } from "date-fns";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import StatsCards from "./StatsCards";

function Overview({ userSettings }: { userSettings: UserSettings }) {
  // Avoid hydration error by initializing dateRange after hydration
  const [dateRange, setDateRange] = useState<{ from: Date | null; to: Date | null }>({
    from: null,
    to: null,
  });

  useEffect(() => {
    const now = new Date();
    setDateRange({
      from: startOfMonth(now),
      to: now,
    });
  }, []);

  if (!dateRange.from || !dateRange.to) {
    return null;
  }

  return (
    <div>
      <div className="container flex flex-wrap items-end justify-between gap-2 py-6">
        <h2 className="text-3xl ml-6 font-bold">
          Purr-fect Overview 
        </h2>
        <div className="flex items-center mr-6 gap-3">
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range;
              if (!from || !to) return;
              if (differenceInDays(to, from) > MAX_DATE_RANGE_DAYS) {
                toast.error(`Selected range is too large.`);
                return;
              }
              setDateRange({ from, to });
            }}
          />
        </div>
      </div>
      <StatsCards from={dateRange.from} to={dateRange.to} />
    </div>
  );
}

export default Overview;
