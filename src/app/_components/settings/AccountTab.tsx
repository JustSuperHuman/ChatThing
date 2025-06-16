"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export default function AccountTab() {
  const { data: session } = useSession();
  const user = session?.user;
  const router = useRouter();

  const { mutate: createCheckoutSession, isPending } =
    api.settings.createCheckoutSession.useMutation({
      onSuccess: (data) => {
        if (data.url) {
          router.push(data.url);
        }
      },
    });

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={user?.image ?? undefined} />
          <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="font-semibold">{user?.name}</span>
          <span className="text-sm text-muted-foreground">{user?.email}</span>
        </div>
      </div>
      <Button
        variant="outline"
        className="w-fit"
        onClick={() => createCheckoutSession()}
        disabled={isPending}
      >
        Manage Subscription
      </Button>
    </div>
  );
}