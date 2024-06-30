import PocketBase from "pocketbase";

export const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_HOST);
pb.autoCancellation(false);
pb.admins.authWithPassword(
  process.env.NEXT_PUBLIC_DB_USER as string,
  process.env.NEXT_PUBLIC_DB_PASS as string
);

export const getScheduleList = async (selectedDay: string) => {
  return await pb.collection("groupSchedule").getList(1, 50, {
    filter: `group.day="${selectedDay}"`,
  });
};

export const createScheduleList = async (schedule: {
  location: string;
  timeRange: string;
  day: string;
  names: string[];
}) => {
  await pb.collection("groupSchedule").create({
    group: JSON.stringify(schedule, null, 2),
  });
};

export const changeSchedule = async (
  id: string,
  schedule: {
    location: string;
    timeRange: string;
    day: string;
    names: string[];
  }
) => {
  await pb.collection("groupSchedule").update(id, {
    group: JSON.stringify(schedule, null, 2),
  });
};

export const deleteSchedule = async (id: string) => {
  await pb.collection("groupSchedule").delete(id);
};
