import Link from "next/link";
import { Clock3, MapPin } from "lucide-react";
import { Container } from "@/components/shared/container";
import { SocialProfileIcon } from "@/components/shared/social-profile-icon";
import { site } from "@/config/site";

export function HeaderInformationBar() {
  const location = site.location || site.address;

  return (
    <div className="header-information-bar on-blue">
      <Container className="header-information-inner">
        <p className="header-welcome">Welcome to {site.shortName}.</p>
        {location && (
          <Link
            href="/contact#office-location"
            className="header-information-item"
          >
            <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
            <span>Location: {location}</span>
          </Link>
        )}
        {site.businessHours && (
          <p className="header-information-item">
            <Clock3 aria-hidden="true" className="size-3.5 shrink-0" />
            <span>Hours: {site.businessHours}</span>
          </p>
        )}
        <div className="header-information-actions">
          <div
            role="group"
            aria-label="Social media"
            className="flex flex-wrap items-center"
          >
            {site.socialProfiles.map(({ label, url }) =>
              url ? (
                <a
                  key={label}
                  href={url}
                  aria-label={`Visit ${site.shortName} on ${label} (opens in a new tab)`}
                  title={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-social-link"
                >
                  <SocialProfileIcon label={label} />
                </a>
              ) : (
                <span
                  key={label}
                  role="img"
                  aria-label={`${label} — profile link coming soon`}
                  title={`${label} — profile link coming soon`}
                  className="header-social-link"
                >
                  <SocialProfileIcon label={label} />
                </span>
              ),
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
