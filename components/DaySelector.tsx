"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useStore } from "@/lib/slice";

export default function DaySelector() {
  const selectedDay = useStore((state) => state.selectedDay);
  const changeDay = useStore((state) => state.changeDay);

  return (
    <div className=" sticky top-0 bg-white grid w-full max-w-sm items-center">
      <Select
        defaultValue={selectedDay}
        onValueChange={(e) => {
          changeDay(
            e as
              | "monday"
              | "tuesday"
              | "wednesday"
              | "thursday"
              | "friday"
              | "saturday"
              | "sunday"
          );
        }}
      >
        <SelectTrigger className="text-xl">
          <SelectValue placeholder="Select a day" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="monday">Monday</SelectItem>
            <SelectItem value="tuesday">Tuesday</SelectItem>
            <SelectItem value="wednesday">Wednesday</SelectItem>
            <SelectItem value="thursday">Thursday</SelectItem>
            <SelectItem value="friday">Friday</SelectItem>
            <SelectItem value="saturday">Saturday</SelectItem>
            <SelectItem value="sunday">Sunday</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
