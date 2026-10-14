import Link from "next/link";
import {
  ArrowUpRight,
  Landmark,
  ShieldCheck,
  Files,
  Building2,
  ClipboardList,
  SearchCheck,
  GraduationCap,
  BriefcaseBusiness,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Service } from "@/types/service";
import { getServiceCategory } from "@/data/services";
export const serviceIcons = {
  governance: Landmark,
  regulatory: ShieldCheck,
  secretarial: Files,
  incorporation: Building2,
  filings: ClipboardList,
  review: SearchCheck,
  training: GraduationCap,
  advisory: BriefcaseBusiness,
};
export function ServiceCard({
  service,
  index = 0,
}: {
  service: Service;
  index?: number;
}) {
  const Icon = serviceIcons[service.icon];
  return (
    <Card className="service-card">
      <CardContent className="flex h-full flex-col p-7">
        <div className="mb-8 flex items-center justify-between">
          <div className="service-icon">
            <Icon className="size-6" strokeWidth={1.4} aria-hidden="true" />
          </div>
          <span className="text-sm tracking-widest text-muted-foreground">
            0{index + 1}
          </span>
        </div>
        <p className="service-category mb-3">
          {getServiceCategory(service.category)?.title || service.category}
        </p>
        <h3 className="max-w-xs text-xl font-semibold leading-7 tracking-tight">
          <Link
            className="after:absolute after:inset-0"
            href={`/services/${service.slug}`}
          >
            {service.title}
          </Link>
        </h3>
        <p className="mt-4 flex-1 text-base leading-6 text-muted-foreground">
          {service.shortDescription}
        </p>
        <div className="mt-7 flex items-center justify-between border-t border-border pt-5">
          <span className="text-sm font-semibold">Explore service</span>
          <ArrowUpRight className="size-5 text-highlight" aria-hidden="true" />
        </div>
        {!service.confirmed && (
          <span className="mt-3 text-sm uppercase tracking-widest text-muted-foreground">
            Proposed service area
          </span>
        )}
      </CardContent>
    </Card>
  );
}
