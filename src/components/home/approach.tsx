import { Container } from "@/components/shared/container";
export function Approach() {
  return (
    <section className="section-space border-t border-border">
      <Container>
        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">OUR APPROACH</p>
            <h2 className="section-title mt-4">A clear path forward.</h2>
          </div>
          <p className="max-w-sm text-base leading-6 text-muted-foreground">
            Thoughtful conversations. Defined priorities.
            <br />
            Practical next steps for your business.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              n: "01",
              title: "Understand",
              text: "Start with your business, your priorities and the challenges you want to address.",
            },
            {
              n: "02",
              title: "Define",
              text: "Agree the scope, responsibilities, deliverables and fees before the work begins.",
            },
            {
              n: "03",
              title: "Move forward",
              text: "Follow a structured plan, with clear communication and an agreed review process.",
            },
          ].map((s) => (
            <div key={s.n} className="border-t border-border pt-6">
              <p className="text-base text-highlight">
                {s.n}{" "}
                <span className="ml-4 inline-block w-12 border-t border-highlight align-middle" />
              </p>
              <h3 className="mt-7 text-xl font-semibold">{s.title}</h3>
              <p className="mt-4 max-w-xs text-base leading-7 text-muted-foreground">
                {s.text}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
