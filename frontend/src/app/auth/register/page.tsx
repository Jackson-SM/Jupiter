import { SignupForm } from '@/components/organisms/SignupForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jupiter Register',
};

export default function Register() {
  return <SignupForm />;
}
