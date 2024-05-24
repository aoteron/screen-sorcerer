import Link from 'next/link';
import { checkIfEmailExists } from '@/services/authUtils';

interface WelcomePageProps {
  email: string;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>, email: string) => void;
  router: any;
}

export const WelcomePage = ({
  email,
  handleEmailChange,
  handleSubmit,
  router,
}: WelcomePageProps) => {

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const emailExists = await checkIfEmailExists(email);
    if (emailExists) {
      router.push(`/login?email=${encodeURIComponent(email)}`);
    } else {
      handleSubmit(e, email); 
    }
  };

  return (
    <main className="main-content flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome!</h1>

      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center justify-center w-full max-w-xs p-6 space-y-4 rounded-lg"
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="input"
          value={email}
          onChange={handleEmailChange}
        />
        <button type="submit" className="btn">
          Start
        </button>
      </form>

      <p className="text-center mt-6">
        Already have an account?{' '}
        <Link href="/sign-in">
          <span className="text-rebecca-purple hover:underline cursor-pointer">
            Sign in
          </span>
        </Link>
      </p>
    </main>
  );
};
