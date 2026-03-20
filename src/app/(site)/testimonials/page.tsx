import TestimonialsPage from "@/components/Testimonials";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials | Saarthi4u",
  description:
    "Read genuine success stories from students and parents who navigated their education journey with Saarthi4u — colleges, courses, scholarships, and career guidance.",
};

// TODO (backend): replace DEMO_TESTIMONIALS with an API call, e.g.:
// const testimonials = await fetch(`${process.env.API_URL}/testimonials`).then(r => r.json());
// Then pass: <TestimonialsPage testimonials={testimonials} />

export default function Page() {
  return <TestimonialsPage />;
}
