import {
  UserApi,
  CertificateApi,
  LogoutApi,
  UserDetailsApi,
} from "../generated-client";

export const userApi: UserApi = new UserApi();
export const certificateApi: CertificateApi = new CertificateApi();
export const logoutApi: LogoutApi = new LogoutApi();
export const userDetailsApi: UserDetailsApi = new UserDetailsApi();
