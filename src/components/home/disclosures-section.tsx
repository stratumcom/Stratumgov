import { Container } from "@/components/shared/container";

export function DisclosuresSection() {
  return (
    <section
      id="disclosures"
      aria-labelledby="disclosures-title"
      className="section-space border-t border-border bg-surface"
    >
      <Container>
        <div className="max-w-5xl">
          <h2
            id="disclosures-title"
            className="text-xl font-semibold tracking-wide"
          >
            DISCLOSURES:
          </h2>
          <div className="mt-6 space-y-6 text-base leading-8 text-muted-foreground">
            <p>
              <strong className="font-semibold text-foreground">
              Stratum Corporate Ltd.
              </strong>{" "}
              operates strictly as a corporate support, administrative facilitation, and business advisory company. Stratum Corporate Ltd is not a law firm, accounting practice, or government agency, and does not directly execute statutory filings reserved by law for accredited professionals.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Execution of Statutory Filings:
              </strong>{" "}
             To ensure full compliance with the Legal Practitioners Act, the Companies and Allied Matters Act (CAMA) 2020, and Corporate Affairs Commission (CAC) regulations, all CAC business registrations, company incorporations, and statutory corporate filings initiated through our platform are referred to and independently executed by CAC-accredited legal practitioners.
            </p>
            <p>
              <strong className="font-semibold text-foreground">
                Segregated Fees:
              </strong>{" "}
              Fees displayed on our platform and itemized on our invoices distinctly separate Stratum Corporate Ltd’s administrative and consultancy fees from the independent professional fees of the accredited filing practitioners and official government charges (which Stratum collects and remits strictly as a disbursement agent on the client's behalf without receiving any commission).
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
