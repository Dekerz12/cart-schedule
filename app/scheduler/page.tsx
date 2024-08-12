"use client";
import { DateChanger } from "@/components/DateChanger";
import DaySelector from "@/components/DaySelector";
import ScheduleAddCard from "@/components/ScheduleAddCard";
import ScheduleCard from "@/components/ScheduleCard";
import { Input } from "@/components/ui/input";
import { getScheduleList, pb } from "@/lib/pocketbase";
import { useStore } from "@/lib/slice";
import { cn, timeRangeMap } from "@/lib/utils";
import { useEffect, useState } from "react";

const SchedulerPage = () => {
  const schedule = useStore((state) => state.scheduleList);
  const setSchedule = useStore((state) => state.updateScheduleList);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectedDay = useStore((state) => state.selectedDay);

  useEffect(() => {
    const getSchedule = async () => {
      try {
        setIsLoading(true);
        const result = await getScheduleList(selectedDay);
        console.log(result);
        if (result.items) {
          setIsLoading(false);

          setSchedule(
            result.items
              .map((item) => {
                item.group.id = item.id;
                return item.group;
              })
              .sort((a: any, b: any) => {
                return (
                  timeRangeMap[a.timeRange as keyof typeof timeRangeMap] -
                  timeRangeMap[b.timeRange as keyof typeof timeRangeMap]
                );
              })
          );
        }
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    };

    getSchedule();
  }, [selectedDay, setSchedule]);
  const updateSchedule = (sched: any) => {
    setSchedule(sched);
  };

  return (
    <div className="h-dvh p-4 flex gap-2">
      <ScheduleAddCard updateSchedule={updateSchedule} />
      <div className="flex-1">
        <div className="p-2 relative">
          <div className="flex gap-4 items-center justify-between">
            <DaySelector />
            <DateChanger />
          </div>

          <div className="mt-4">
            <h1 className="p-2 text-2xl font-bold">Schedule</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
              {isLoading ? (
                <div className="h-72 flex items-center justify-center col-span-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={cn("animate-spin")}
                  >
                    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                  </svg>
                </div>
              ) : (
                Array.isArray(schedule) &&
                schedule.map((sched) => (
                  <ScheduleCard
                    key={sched.id}
                    schedule={sched}
                    hasPopover={true}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulerPage;
