import { CautionTape } from "@/components/hud";

const metrics = [
  {
    value: "60M+",
    label: "API requests a year",
    detail: "Serverless AWS platform I helped build and operate at Siatech.",
  },
  {
    value: "12,000+",
    label: "Users served",
    detail: "Same platform, kept under a 0.3% Lambda error rate.",
  },
  {
    value: "−39%",
    label: "Cost per request",
    detail: "From MongoDB query, batching and caching work.",
  },
  {
    value: "7,000+",
    label: "Automated tests",
    detail: "Behind CI/CD with GitHub Actions across 20+ services.",
  },
] as const;


export function Facts() {
  return (
    <section aria-label="Production data">
      <CautionTape />
      <div className="bg-accent text-white">
        <div className="mx-auto max-w-[1380px] px-5 pt-16 pb-14 sm:px-8 lg:px-10 lg:pt-20">

          <dl className="grid sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="group @container border-t border-white/25 py-8 sm:even:border-l lg:border-t-0 lg:border-l lg:py-2 lg:first:border-l-0"
              >
                {/* Horizontal padding lives on dt/dd, not on the column, so the
                    column's container width (and so the figure size) is the
                    same for all four. */}
                <dt className="hud flex items-center gap-3 text-white/75 sm:group-odd:pr-8 sm:group-even:pl-8 lg:px-8 lg:group-first:pl-0 lg:group-odd:pr-8">
                  {metric.label}
                </dt>
                <dd className="mt-5 sm:group-odd:pr-8 sm:group-even:pl-8 lg:px-8 lg:group-first:pl-0 lg:group-odd:pr-8">
                  {/* At 21cqi of the column the widest figure, "12,000+"
                      (3.41em), fits inside the padding from 1024px up. */}
                  <span className="title-card block text-[clamp(2.75rem,21cqi,5.9rem)] leading-[0.86]">
                    {metric.value}
                  </span>
                  <span className="mt-4 block max-w-[30ch] text-sm leading-relaxed text-white/80">
                    {metric.detail}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

      </div>
    </section>
  );
}
