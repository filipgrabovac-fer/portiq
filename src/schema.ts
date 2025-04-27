import {
  UserApi,
  CertificateApi,
  LogoutApi,
  UserDetailsApi,
  DevelopmentApi,
  EducationApi,
} from "../generated-client";

export const userApi: UserApi = new UserApi();
export const certificateApi: CertificateApi = new CertificateApi();
export const logoutApi: LogoutApi = new LogoutApi();
export const userDetailsApi: UserDetailsApi = new UserDetailsApi();
export const developmentApi: DevelopmentApi = new DevelopmentApi();
export const educationApi: EducationApi = new EducationApi();
