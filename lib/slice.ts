import { create } from "zustand";

interface GlobalState {
  selectedDay:
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | "sunday";
  changeDay: (
    day:
      | "monday"
      | "tuesday"
      | "wednesday"
      | "thursday"
      | "friday"
      | "saturday"
      | "sunday"
  ) => void;
  selectedSchedule: {
    id: string;
    location: string;
    timeRange: string;
    names: string[];
    day: string;
  } | null;
  selectSchedule: (
    schedule: {
      id: string;
      location: string;
      timeRange: string;
      names: string[];
      day: string;
    } | null
  ) => void;
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  scheduleList: any;
  updateScheduleList: (sched: any) => void;
}

export const useStore = create<GlobalState>()((set) => ({
  selectedDay: "monday",
  changeDay: (day) => set((state) => ({ selectedDay: day })),
  selectedSchedule: null,
  selectSchedule: (schedule) =>
    set((state) => ({ selectedSchedule: schedule, isEditing: true })),
  isEditing: false,
  setIsEditing: (isEditing) => set((state) => ({ isEditing: isEditing })),
  scheduleList: null,
  updateScheduleList: (sched: any) => set((state) => ({ scheduleList: sched })),
}));
