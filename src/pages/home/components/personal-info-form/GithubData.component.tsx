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
    <div className="flex flex-col gap-4 bg-white border border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-4 ">
        <a href={githubUrl} target="_blank">
          <img
            src={avatarUrl}
            alt="avatar"
            className="max-w-16 max-h-16 rounded-full border border-gray-300 "
          />
        </a>
        <div className="overflow-x-hidden">
          <a
            className="text-xl font-semibold text-blue-700 hover:underline"
            href={githubUrl}
            target="_blank"
          >
            {username}
          </a>
          <div className="flex gap-2 mt-1 overflow-x-scroll">
            <div className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
              Public repositories:{" "}
              <div className="font-semibold">{publicRepos}</div>
            </div>
            <div className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
              Followers: <div className="font-semibold">{followers}</div>
            </div>
            <div className="bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded">
              Following: <div className="font-semibold">{following}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
