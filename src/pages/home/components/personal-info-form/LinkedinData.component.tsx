export const LinkedinData = () => {
  return (
    <a
      href={`https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${
        import.meta.env.VITE_LINKEDIN_CLIENT_ID
      }&redirect_uri=${
        import.meta.env.VITE_LINKEDIN_REDIRECT_URI
      }&scope=profile%20openid%20email&state=nekiRandomString`}
      className="flex items-center gap-2 bg-[#0077B5] hover:bg-[#005983] text-white font-semibold px-6 py-3 rounded-md shadow-md transition-all duration-300  h-16 w-full"
      style={{ textDecoration: "none" }}
    >
      <div className="flex items-center gap-2 mx-auto">
        <span className="bg-white rounded-sm p-1">
          <img
            src="/images/icons/linkedin-icon.svg"
            className="w-5 h-5"
            alt="LinkedIn logo"
          />
        </span>
        <span className="">Import from LinkedIn</span>
      </div>
    </a>
  );
};
