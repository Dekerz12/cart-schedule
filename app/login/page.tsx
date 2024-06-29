/**
 * v0 by Vercel.
 * @see https://v0.dev/t/s4NH4tMGdMF
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Login() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Welcome back!
          </h1>
          <p className="mt-2 text-muted-foreground">
            Enter your username and password to sign in.
          </p>
        </div>
        <form className="space-y-4">
          <div>
            <Label htmlFor="username" className="sr-only">
              Username
            </Label>
            <Input
              id="username"
              placeholder="Username"
              className="w-full"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" className="sr-only">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <div className="flex items-center justify-between">
          <Link
            href="#"
            className="text-sm font-medium text-primary hover:underline"
            prefetch={false}
          >
            Forgot password?
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-primary hover:underline"
            prefetch={false}
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
