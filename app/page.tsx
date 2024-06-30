"use client";
import DaySelector from "@/components/DaySelector";
import ScheduleCard from "@/components/ScheduleCard";
import { getScheduleList, login } from "@/lib/pocketbase";
import { useStore } from "@/lib/slice";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import conventionGif from "@/public/LottieFiles- Download Free lightweight animations for website & apps..gif";

export default function Home() {
  const schedule = useStore((state) => state.scheduleList);
  const setSchedule = useStore((state) => state.updateScheduleList);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const selectedDay = useStore((state) => state.selectedDay);
  useEffect(() => {
    const getSchedule = async () => {
      try {
        setIsLoading(true);
        await login();
        const result = await getScheduleList(selectedDay);
        if (result.items) {
          setIsLoading(false);
          setSchedule(result.items.map((item) => item.group));
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
        ) : !schedule?.length ? (
          <div className="flex flex-col justify-center items-center flex-1 h-full">
            <Image src={conventionGif} alt="convention-image" unoptimized />
            <h1 className="font-bold"> Regional 2024 Convention</h1>
          </div>
        ) : Array.isArray(schedule) && schedule?.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4">
            {schedule.map((sched) => (
              <ScheduleCard key={sched.id} schedule={sched} />
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}
