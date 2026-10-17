import Link from "next/link";
import { MessageCircle, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import type { Service } from "@/types/service";
export function WhatsAppCTA({ service }: { service?: Service }) {
  const url = whatsappUrl(
    site.whatsapp,
    service,
    service?.conversionType === "whatsapp-payment",
  );
  if (!url)
    return (
      <div>
        <Button asChild variant="outline">
          <Link
            href={
              service ? `/consultation?service=${service.slug}` : "/contact"
            }
          >
            Enquire {service ? "about this service" : "with us"}
            <ArrowUpRight className="size-4" />
          </Link>
        </Button>
        {/* <p className="mt-3 max-w-xs text-sm leading-5 text-muted-foreground">
          WhatsApp contact will be available once the business number is
          confirmed.
        </p> */}
      </div>
    );
  return (
    <div>
      <Button asChild variant="outline">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="size-4" />
          {service?.conversionType === "whatsapp-payment"
            ? "Discuss fees on WhatsApp"
            : "Enquire on WhatsApp"}
          <ArrowUpRight className="size-4" />
        </a>
      </Button>
      {service?.conversionType === "whatsapp-payment" && (
        <p className="mt-3 max-w-xs text-sm leading-5 text-muted-foreground">
          Scope and payment arrangements are confirmed directly. This link does
          not process a payment.
        </p>
      )}
    </div>
  );
}
