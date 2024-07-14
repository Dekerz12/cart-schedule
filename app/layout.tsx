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

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params, searchParams }: Props) {
  return {
    title: dayjs().format("dddd") !== "Sunday" ? thisWeek : nextWeek,
    description: "Local Cart Witnessing of Sta. Rita Congregation",
  };
}

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
