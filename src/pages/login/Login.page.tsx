export const Login = () => {
  const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
    import.meta.env.VITE_GOOGLE_CLIENT_ID
  }&redirect_uri=${
    import.meta.env.VITE_GOOGLE_REDIRECT_URI
  }&response_type=code&scope=email profile`;
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1>New to PortIQ? Sign up here:</h1>
      <a href={googleLoginUrl}>Sign up with Google</a>
    </div>
  );
};
