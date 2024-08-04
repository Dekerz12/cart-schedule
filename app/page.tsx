"use client";
import DaySelector from "@/components/DaySelector";
import ScheduleCard from "@/components/ScheduleCard";
import { getDate, getScheduleList, login } from "@/lib/pocketbase";
import { useStore } from "@/lib/slice";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import { useEffect, useState } from "react";

const timeRangeMap = {
  "6AM - 8AM": 1,
  "8AM - 10AM": 2,
  "10AM - 12NN": 3,
  "1PM - 3PM": 4,
  "3PM - 5PM": 5,
};

export default function Home() {
  const schedule = useStore((state) => state.scheduleList);
  const setSchedule = useStore((state) => state.updateScheduleList);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [date, setDate] = useState<string>("");
  const selectedDay = useStore((state) => state.selectedDay);

  dayjs.extend(weekday);

  useEffect(() => {
    const getSchedule = async () => {
      try {
        setIsLoading(true);
        await login();
        const result = await getScheduleList(selectedDay);
        const date = await getDate();
        setDate(date.field);
        if (result.items) {
          setIsLoading(false);
          const items = result.items.map((item) => item.group);
          setSchedule(
            items.sort((a: any, b: any) => {
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

  return (
    <div className="p-2 relative min-h-dvh flex flex-col">
      <h1 className="font-bold text-xl">{date}</h1>
      <DaySelector />

      <div className="mt-4 flex-1 flex flex-col">
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
        ) : Array.isArray(schedule) && schedule?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
            {schedule.map((sched, i) => (
              <ScheduleCard key={i} schedule={sched} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
