import { GithubResponse } from "../../../../../generated-client";

export const GithubData = ({
  avatarUrl,
  githubUrl,
  publicRepos,
  followers,
  following,
}: GithubResponse) => {
  const username = githubUrl.replace("https://github.com/", "");

  return (
    <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-xl  p-6">
      <div className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt="avatar"
          className="w-16 h-16 rounded-full border border-gray-300 "
        />
        <div>
          <a
            className="text-xl font-semibold text-blue-700 hover:underline"
            href={githubUrl}
            target="_blank"
          >
            {username}
          </a>
          <div className="flex gap-2 mt-1">
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
              Public repositories:{" "}
              <span className="font-semibold">{publicRepos}</span>
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
              Followers: <span className="font-semibold">{followers}</span>
            </span>
            <span className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
              Following: <span className="font-semibold">{following}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
