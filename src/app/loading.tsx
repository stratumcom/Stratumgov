import { LoaderCircle } from "lucide-react";
export default function Loading() {
  return (
    <div
      role="status"
      className="flex min-h-96 items-center justify-center gap-3 text-base text-muted-foreground"
    >
      <LoaderCircle className="size-5 animate-spin" />
      Loading your next step…
    </div>
  );
}
