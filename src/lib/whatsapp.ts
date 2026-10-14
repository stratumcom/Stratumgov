export function whatsappUrl(
  number: string,
  service?: { title: string; slug: string },
  payment = false,
) {
  if (!/^[1-9]\d{7,14}$/.test(number)) return null;
  const message = service
    ? `Hello stratum Governance, I would like to ${payment ? "discuss the scope, fees and payment arrangements for" : "enquire about"} ${service.title} (service: ${service.slug}). Please confirm availability and next steps.`
    : "Hello Stratum Governance, I would like to discuss my corporate compliance needs. Please let me know the next steps.";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
