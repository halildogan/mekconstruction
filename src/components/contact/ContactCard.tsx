import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { formatAddressLines, siteConfig } from "@/content/site";
import { formatTime12 } from "@/lib/format";

/** Company contact details, all from siteConfig. */
export function ContactCard() {
  const { phone, publicEmail, businessHours } = siteConfig;
  return (
    <div className="border border-ink/15 bg-white">
      <dl className="divide-y divide-ink/10">
        <div className="grid grid-cols-[2rem_1fr] p-6">
          <dt className="pt-0.5">
            <Phone aria-hidden="true" className="size-5 text-accent-ink" />
            <span className="sr-only">Phone</span>
          </dt>
          <dd>
            <a href={`tel:${phone.e164}`} data-track-location="contact-card" className="text-xl font-semibold hover:text-accent-ink">
              {phone.display}
            </a>
          </dd>
        </div>
        {publicEmail && (
          <div className="grid grid-cols-[2rem_1fr] p-6">
            <dt className="pt-0.5">
              <Mail aria-hidden="true" className="size-5 text-accent-ink" />
              <span className="sr-only">Email</span>
            </dt>
            <dd>
              <a href={`mailto:${publicEmail}`} data-track-location="contact-card" className="font-semibold hover:text-accent-ink">
                {publicEmail}
              </a>
            </dd>
          </div>
        )}
        <div className="grid grid-cols-[2rem_1fr] p-6">
          <dt className="pt-0.5">
            <MapPin aria-hidden="true" className="size-5 text-accent-ink" />
            <span className="sr-only">Address</span>
          </dt>
          <dd>
            <address className="leading-relaxed not-italic">
              <span className="block font-semibold">{siteConfig.legalName}</span>
              {formatAddressLines().map((line) => (
                <span key={line} className="block text-steel-700">
                  {line}
                </span>
              ))}
            </address>
          </dd>
        </div>
        <div className="grid grid-cols-[2rem_1fr] p-6">
          <dt className="pt-0.5">
            <Clock aria-hidden="true" className="size-5 text-accent-ink" />
            <span className="sr-only">Business hours</span>
          </dt>
          <dd>
            <ul className="grid gap-1.5 text-[0.9375rem]">
              {businessHours.map((h) => (
                <li key={h.label} className="flex justify-between gap-4">
                  <span className="text-steel-700">{h.label}</span>
                  <span className="font-medium">
                    {h.opens && h.closes ? `${formatTime12(h.opens)} – ${formatTime12(h.closes)}` : "Closed"}
                  </span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
      </dl>
    </div>
  );
}
