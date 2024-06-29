import PocketBase from "pocketbase";

export const pb = new PocketBase(process.env.NEXT_PUBLIC_DB_HOST);
pb.autoCancellation(false);
pb.admins.authWithPassword(
  process.env.NEXT_PUBLIC_DB_USER as string,
  process.env.NEXT_PUBLIC_DB_PASS as string
);
