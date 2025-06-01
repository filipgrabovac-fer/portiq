import {
  DevelopmentApi,
  GithubApi,
  LogoutApi,
  ProfileComponentApi,
  UserApi,
  UserDetailsApi,
  LinkedinDataApi,
  ImageUploadApi,
  VertexAiApi,
} from "../generated-client";

export const userApi: UserApi = new UserApi();
export const logoutApi: LogoutApi = new LogoutApi();
export const userDetailsApi: UserDetailsApi = new UserDetailsApi();
export const developmentApi: DevelopmentApi = new DevelopmentApi();
export const profileComponentApi: ProfileComponentApi =
  new ProfileComponentApi();
export const githubApi: GithubApi = new GithubApi();
export const linkedinApi: LinkedinDataApi = new LinkedinDataApi();
export const imageUploadApi: ImageUploadApi = new ImageUploadApi();
export const vertexAiApi: VertexAiApi = new VertexAiApi();
