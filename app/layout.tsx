import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";

const inter = Inter({ subsets: ["latin"] });
dayjs.extend(weekday);

const thisWeek = `${dayjs().day(1).format("MMMM D")} - ${dayjs()
  .weekday(7)
  .format("MMMM D")}`;

const nextWeek = `${dayjs().weekday(7).day(1).format("MMMM D")} - ${dayjs()
  .weekday(7)
  .weekday(7)
  .format("MMMM D")}`;

export const metadata: Metadata = {
  title: thisWeek,
  description: "Local Cart Witnessing of Sta. Rita Congregation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
