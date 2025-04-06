import { LogInIcon } from "lucide-react";
export const Login = () => {
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    import.meta.env.VITE_GOOGLE_CLIENT_ID
  }&redirect_uri=${
    import.meta.env.VITE_GOOGLE_REDIRECT_URI
  }&response_type=code&scope=email profile`;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold">New to PortIQ? Sign up here:</h1>
      <a
        href={googleLoginUrl}
        className="flex justify-between gap-4 items-center mt-4 bg-button_blue p-3 text-white rounded hover:opacity-80 duration-300"
      >
        <LogInIcon width={16} height={16} />
        <p>Sign up with Google</p>
      </a>
    </div>
  );
};
