"use client";
import { useState } from "react";
import { Copy, Check, Link2, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
export function ShareLinks({
  url,
  title,
  label = "Share this perspective",
}: {
  url: string;
  title: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="mr-2 text-sm text-muted-foreground">{label}</span>
      <Button asChild variant="outline" size="icon">
        <a
          aria-label="Share on LinkedIn"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Link2 className="size-4" />
        </a>
      </Button>
      <Button asChild variant="outline" size="icon">
        <a
          aria-label="Share on X"
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Share2 className="size-4" />
        </a>
      </Button>
      <Button
        variant="outline"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setError(false);
          } catch {
            setError(true);
          }
        }}
      >
        {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        {copied ? "Link copied" : "Copy link"}
      </Button>
      {error && (
        <span role="alert" className="text-sm text-error">
          Copy the link from your browser’s address bar.
        </span>
      )}
    </div>
  );
}
