import { Card } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { useStore } from "@/lib/slice";
import { PopoverClose } from "@radix-ui/react-popover";
import { deleteSchedule, getScheduleList, pb } from "@/lib/pocketbase";
interface ScheduleCard {
  schedule: {
    id: string;
    location: string;
    timeRange: string;
    names: string[];
    day: string;
  };
  hasPopover?: boolean;
}

export default function ScheduleCard({
  schedule,
  hasPopover = false,
}: ScheduleCard) {
  const selectSchedule = useStore((state) => state.selectSchedule);

  const setSchedule = useStore((state) => state.updateScheduleList);
  if (hasPopover) {
    return (
      <Popover>
        <PopoverTrigger>
          <div className="p-2">
            <Card className="max-w-lg p-4 grid gap-4 h-[230px]">
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold ">{schedule.location}</h3>
                <div className="bg-muted px-3 py-1 rounded-full text-sm font-medium text-muted-foreground w-fit">
                  {schedule.timeRange}
                </div>
              </div>
              <div className="space-y-2 ml-2">
                {schedule.names.map((name) => (
                  <p
                    key={name}
                    className="text-muted-foreground font-medium w-fit"
                  >
                    {name}
                  </p>
                ))}
              </div>
            </Card>
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex items-center justify-center gap-4 w-48">
          <PopoverClose asChild>
            <Button
              onClick={() => {
                selectSchedule(schedule);
              }}
            >
              Edit
            </Button>
          </PopoverClose>
          <Button
            variant="destructive"
            onClick={async () => {
              await deleteSchedule(schedule.id);
              const res = await getScheduleList(schedule.day);
              if (res.items) {
                setSchedule(
                  res.items.map((item) => {
                    item.group.id = item.id;
                    return item.group;
                  })
                );
              }
            }}
          >
            Delete
          </Button>
        </PopoverContent>
      </Popover>
    );
  } else {
    return (
      <div className="p-2 ">
        <Card className="max-w-lg p-4 grid gap-4 !min-h-[230px]">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{schedule.location}</h3>
            <div className="bg-muted px-3 py-1 rounded-full text-sm font-medium text-muted-foreground w-fit">
              {schedule.timeRange}
            </div>
          </div>
          <div className="space-y-2 ml-2">
            {schedule.names.map((name) => (
              <p key={name} className="text-muted-foreground font-medium w-fit">
                {name}
              </p>
            ))}
          </div>
        </Card>
      </div>
    );
  }
}
