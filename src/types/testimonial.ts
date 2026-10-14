export interface Testimonial {
  /** Stable identifier for editing and rendering an individual entry. */
  id: string;
  text: string;
  /** Set to true only after the company approves the genuine quote and details. */
  approved: boolean;
  clientName?: string;
  clientRole?: string;
  companyName?: string;
  serviceReceived?: string;
  image?: {
    src: string;
    /** Supply meaningful alt text for the approved photograph or logo. */
    alt: string;
    kind?: "portrait" | "logo";
  };
}
