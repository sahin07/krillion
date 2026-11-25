import { redirect } from 'next/navigation';

/** Old slug → Unlimited Krillion */
export default function UnlimitedRedirectPage() {
  redirect('/unlimited-krillion');
}
