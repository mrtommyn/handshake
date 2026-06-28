import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="mx-auto max-w-md py-6">
      <Link
        href="/app"
        className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to dashboard
      </Link>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Your profile</h1>

      <ProfileForm initialName={profile?.full_name ?? ""} />

      <div className="mt-8 space-y-3 border-t border-border pt-6 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Phone</span>
          <span className="font-medium">{profile?.phone ?? user.phone ?? "—"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Email</span>
          <span className="font-medium">{profile?.email ?? user.email ?? "—"}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Identity</span>
          <span
            className="rounded-full px-2.5 py-0.5 text-xs font-semibold"
            style={
              profile?.identity_verified
                ? { background: "color-mix(in srgb, var(--verified) 16%, white)", color: "#0c5a32" }
                : { background: "var(--secondary)", color: "var(--secondary-foreground)" }
            }
          >
            {profile?.identity_verified ? "Verified ✓" : "Not verified"}
          </span>
        </div>
      </div>
    </div>
  );
}
