"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
      callbackUrl: "/",
    });

    if (result?.error) {
      setError("Λάθος username ή password.");
      return;
    }
    window.location.href = "/";
  }

  return (
    <div className={cn("min-h-screen w-full", className)} {...props}>
      <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-6xl items-center">
        <Card className="w-full overflow-hidden border border-pink-100 bg-card/95 shadow-2xl backdrop-blur p-0">
          <CardContent className="grid p-0 lg:grid-cols-2">
            {/* Left side */}
            <div className="relative hidden overflow-hidden bg-pink-50 lg:block">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.22),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(236,72,153,0.16),transparent_30%)]" />

              <div className="relative flex h-full flex-col justify-between p-10">
                <div>
                  <div className="flex items-center gap-4">
                    <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-white shadow-lg">
                      <Image
                        src="/images/after-glow-logo.jpg"
                        alt="After Glow Logo"
                        fill
                        sizes="80px"
                        className="object-cover"
                        priority
                      />
                    </div>

                    <div>
                      <h2 className="text-3xl font-bold tracking-tight text-zinc-900">
                        After Glow
                      </h2>
                      <p className="mt-1 text-sm text-zinc-600">
                        Σύστημα Διαχείρισης Κρατήσεων/Ραντεβού
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 max-w-md space-y-4">
                    <h3 className="text-4xl font-bold tracking-tight text-zinc-900">
                      Είσοδος στο σύστημα
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center p-6 sm:p-10 lg:p-12"
            >
              <FieldGroup className="space-y-6">
                <div className="flex flex-col gap-2 text-center lg:text-left">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-pink-600">
                    After Glow Bookings
                  </p>
                  <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
                    Login
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Είσοδος χρήστη
                  </p>
                </div>

                <Field>
                  <FieldLabel htmlFor="username">Όνομα Χρήστη</FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    placeholder="your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="h-12 rounded-xl border-pink-100 bg-pink-50/40 focus-visible:ring-pink-500"
                    required
                  />
                </Field>

                <Field>
                  <div className="flex items-center">
                    <FieldLabel htmlFor="password">
                      Κωδικός Πρόσβασης
                    </FieldLabel>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 rounded-xl border-pink-100 bg-pink-50/40 focus-visible:ring-pink-500"
                    required
                  />
                </Field>

                {error && <p className="text-sm text-destructive">{error}</p>}

                <Field>
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-xl bg-pink-600 text-white shadow-lg shadow-pink-200 transition hover:bg-pink-700"
                  >
                    Login
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
