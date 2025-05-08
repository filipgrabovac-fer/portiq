import { LogInIcon } from "lucide-react";

export const Login = () => {
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    import.meta.env.VITE_GOOGLE_CLIENT_ID
  }&redirect_uri=${
    import.meta.env.VITE_GOOGLE_REDIRECT_URI
  }&response_type=code&scope=email profile`;

  return (
    <div className="px-2 h-screen flex items-center justify-center bg-[linear-gradient(252.35deg,#C180FF_2.52%,rgba(150,53,241,0.8)_32.43%,#7A6FF6_60.98%,rgba(223,129,129,0.9)_90.29%)]">
      <div className="bg-white/20 rounded-2xl px-10 py-12 flex flex-col items-center max-w-md w-full shadow-md">
        <h1 className="text-3xl font-bold text-white mb-2 ">
          Welcome to PortIQ
        </h1>
        <p className="text-white/90 mb-8 text-center ">
          Sign up to access your personalized portfolio and discover new
          opportunities.
        </p>
        <a
          href={googleLoginUrl}
          className="flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-300"
        >
          <LogInIcon width={20} height={20} />
          <span>Sign up with Google</span>
        </a>
      </div>
    </div>
  );
};
