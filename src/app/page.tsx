export default function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      {/* Welcome message */}
      <h1 className="text-3xl font-bold text-center mb-6">Welcome!</h1>

      {/* Main container */}
      <div className="flex flex-col items-center justify-center w-full max-w-xs p-6 space-y-4 rounded-lg">
        <input type="email" placeholder="Enter your email" className="input" />
        <button className="btn">Sign up</button>
      </div>

      {/* Additional message */}
      <p className="text-center mt-6">
        Already have an account?{' '}
        <a href="/sign-in" className="text-rebecca-purple hover:underline">
          Sign in
        </a>
      </p>
    </main>
  );
}
