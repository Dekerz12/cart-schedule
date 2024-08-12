import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const timeRangeMap = {
  "6AM - 8AM": 1,
  "8AM - 10AM": 2,
  "10AM - 12NN": 3,
  "1PM - 3PM": 4,
  "3PM - 5PM": 5,
};
