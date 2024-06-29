"use client";
import { Card } from "@/components/ui/card";
import { locations, timeRange } from "@/config/data";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { pb } from "@/lib/pocketbase";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "./ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useStore } from "@/lib/slice";
import { useEffect } from "react";

const FormSchema = z.object({
  location: z.string({
    required_error: "Please select a location",
  }),
  timeRange: z.string({
    required_error: "Please select a timeRange",
  }),
  publisherName1: z.string({
    required_error: "Please select a publisherName",
  }),
  publisherName2: z.string({
    required_error: "Please select a publisherName",
  }),
  publisherName3: z.string(),
  day: z.string({
    required_error: "Please select a day",
  }),
});

export default function ScheduleAddCard({
  updateSchedule,
}: {
  updateSchedule: (sched: any) => void;
}) {
  const selectedSchedule = useStore((state) => state.selectedSchedule);
  const isEditing = useStore((state) => state.isEditing);
  const setIsEditing = useStore((state) => state.setIsEditing);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (isEditing && selectedSchedule) {
      form.setValue("day", selectedSchedule.day);
      form.setValue("location", selectedSchedule.location);
      form.setValue("timeRange", selectedSchedule.timeRange);
      form.setValue("publisherName1", selectedSchedule.names[0]);
      form.setValue("publisherName2", selectedSchedule.names[1]);
      form.setValue("publisherName3", selectedSchedule.names[2]);
    }
  }, [isEditing, selectedSchedule, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const names = [
      data.publisherName1,
      data.publisherName2,
      data.publisherName3,
    ].filter(String);
    toast({
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(
              {
                location: data.location,
                timeRange: data.timeRange,
                day: data.day,
                names,
              },
              null,
              2
            )}
          </code>
        </pre>
      ),
    });
    if (!isEditing) {
      await pb.collection("groupSchedule").create({
        group: JSON.stringify(
          {
            location: data.location,
            timeRange: data.timeRange,
            day: data.day,
            names,
          },
          null,
          2
        ),
      });
    }

    if (isEditing) {
      await pb
        .collection("groupSchedule")
        .update(selectedSchedule?.id as string, {
          group: JSON.stringify(
            {
              location: data.location,
              timeRange: data.timeRange,
              day: data.day,
              names,
            },
            null,
            2
          ),
        });
      setIsEditing(false);
    }
    const res = await pb.collection("groupSchedule").getList(1, 50, {
      filter: `group.day="${data.day}"`,
    });
    if (res.items) {
      updateSchedule(
        res.items.map((item) => {
          item.group.id = item.id;
          return item.group;
        })
      );
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="basis-1/4">
        <Card className="w-full max-w-lg p-4 grid gap-4 h-full ">
          <div className="flex flex-col justify-evenly">
            <div className="max-w-sm">
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Location</FormLabel>{" "}
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {locations.map((location) => (
                            <SelectItem key={location} value={location}>
                              {location}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <div className="max-w-sm">
              <FormField
                control={form.control}
                name="timeRange"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Range</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Time" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          {timeRange.map((time) => (
                            <SelectItem key={time} value={time}>
                              {time}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="max-w-sm">
              <FormField
                control={form.control}
                name="day"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Day</FormLabel>{" "}
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Day" />
                        </SelectTrigger>
                      </FormControl>
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
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="publisherName1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Publisher Name"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publisherName2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Publisher Name"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="publisherName3"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Publisher Name"
                        {...field}
                        value={field.value}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {isEditing ? (
            <Button className="w-full" type="submit">
              Edit Schedule
            </Button>
          ) : (
            <Button className="w-full" type="submit">
              Add Schedule
            </Button>
          )}
        </Card>
      </form>
    </Form>
  );
}
