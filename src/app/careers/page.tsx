import { Metadata } from 'next';
import CareersClient from './CareersClient';

export const metadata: Metadata = {
  title: 'Join Our Team | Careers at Saarthi4u',
  description: 'Explore exciting career opportunities at Saarthi4u. Join a purpose-driven educational platform dedicated to guiding students toward a bright future.',
};

export default function CareersPage() {
  return <CareersClient />;
}
