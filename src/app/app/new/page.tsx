import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewHandshakePage() {
  return (
    <div className="mx-auto max-w-md py-10 text-center">
      <h1 className="text-3xl font-extrabold tracking-tight">Start a Handshake</h1>
      <p className="mt-3 text-muted-foreground">
        This is where you will choose to verify someone, write up an agreement, or both, then
        add the details and invite the other person. We are building this flow next.
      </p>
      <Button
        render={<Link href="/app" />}
        nativeButton={false}
        variant="outline"
        className="mt-6 rounded-full"
      >
        Back to dashboard
      </Button>
    </div>
  );
}
